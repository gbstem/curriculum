// Mock next/server to avoid importing real web spec extensions in Node environment.
// Plain functions, not jest.fn(...): beforeEach calls jest.resetAllMocks(), which
// would otherwise strip these implementations and make every call return undefined.
jest.mock('next/server', () => ({
  NextResponse: {
    next: () => ({ type: 'next' }),
    redirect: (url: URL) => ({ type: 'redirect', url: url.toString() }),
  },
}));

import { proxy } from '../proxy';
import { getIronSession } from 'iron-session';

jest.mock('iron-session', () => ({
  getIronSession: jest.fn(),
}));

function makeRequest(pathname: string, headers: Record<string, string> = {}) {
  const url = `http://localhost:3000${pathname}`;
  return {
    nextUrl: { pathname },
    url,
    headers: {
      get: (name: string) => headers[name.toLowerCase()] ?? null,
    },
  } as unknown as import('next/server').NextRequest;
}

describe('proxy middleware', () => {
  let mockSession: { isLoggedIn: boolean; save: jest.Mock };

  beforeEach(() => {
    jest.resetAllMocks();
    mockSession = { isLoggedIn: false, save: jest.fn() };
    (getIronSession as jest.Mock).mockResolvedValue(mockSession);
  });

  it('redirects to /login when not logged in and not already on /login', async () => {
    const result = await proxy(makeRequest('/cs'));
    expect(result).toMatchObject({ type: 'redirect', url: 'http://localhost:3000/login' });
  });

  it('does not redirect when not logged in and already on /login', async () => {
    const result = await proxy(makeRequest('/login'));
    expect(result).toMatchObject({ type: 'next' });
    expect(mockSession.save).not.toHaveBeenCalled();
  });

  it('redirects home when logged in and visiting /login', async () => {
    mockSession.isLoggedIn = true;
    const result = await proxy(makeRequest('/login'));
    expect(result).toMatchObject({ type: 'redirect', url: 'http://localhost:3000/' });
    expect(mockSession.save).not.toHaveBeenCalled();
  });

  it('skips entirely for API, _next, favicon, and images paths', async () => {
    for (const pathname of ['/api/auth', '/_next/static/x.js', '/favicon.ico', '/images/x.png']) {
      const result = await proxy(makeRequest(pathname));
      expect(result).toMatchObject({ type: 'next' });
    }
    expect(mockSession.save).not.toHaveBeenCalled();
  });

  it('extends (saves) the session on a real, logged-in navigation', async () => {
    mockSession.isLoggedIn = true;
    const result = await proxy(makeRequest('/cs'));
    expect(result).toMatchObject({ type: 'next' });
    expect(mockSession.save).toHaveBeenCalledTimes(1);
  });

  it('does not extend the session for a Next.js client-router RSC fetch (prefetch or in-app transition)', async () => {
    // Regression test: re-saving on one of these re-issues a freshly-extended
    // Set-Cookie for a session that may already be gone. If that response
    // lands after an in-flight logout's cookie-clearing response, it revives
    // the just-destroyed session and the user never actually gets logged out.
    // Confirmed empirically (temporary request logging against a live
    // server) that every such background request carries `next-url`, and no
    // genuine top-level page load or first-party API call ever does.
    mockSession.isLoggedIn = true;
    const result = await proxy(makeRequest('/cs', { 'next-url': '/' }));
    expect(result).toMatchObject({ type: 'next' });
    expect(mockSession.save).not.toHaveBeenCalled();
  });
});
