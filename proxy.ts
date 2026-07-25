import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { SessionData } from '@/lib/session';
import { sessionOptions } from '@/lib/sessionOptions';

export async function proxy(req: NextRequest) {
  const res = NextResponse.next();
  const session = await getIronSession<SessionData>(req, res, sessionOptions);

  const { pathname } = req.nextUrl;

  // Skip middleware/proxy for API routes, static assets, and next internal paths
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname.startsWith('/images')
  ) {
    return res;
  }

  // Redirect to /login if not logged in and not on the login page
  if (!session.isLoggedIn && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Redirect to home if logged in and trying to access /login
  if (session.isLoggedIn && pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Extend the session duration if user is active (sliding session), but
  // never for a request driven by Next's client router (RSC segment fetches
  // for both link prefetches and in-app client-side transitions -- both
  // carry the internal `next-url` header, and neither is a real top-level
  // navigation; confirmed empirically, none of the app's own page loads or
  // API calls send this header). Re-saving on one of these re-issues a
  // freshly-extended Set-Cookie for a session that may already be gone; if
  // that response lands after an in-flight logout's cookie-clearing
  // response, it revives the just-destroyed session and the user never
  // actually gets logged out. The session still extends on every genuine
  // page load, so an active user is never at risk of the 7-day TTL expiring
  // out from under them -- only requests already this deep in a client-side
  // SPA session skip the extension.
  const isRouterFetch = req.headers.get('next-url') !== null;
  if (session.isLoggedIn && !isRouterFetch) {
    await session.save();
  }

  return res;
}

export default proxy;

export const config = {
  // Run proxy/middleware on all paths except some static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images).*)'],
};
