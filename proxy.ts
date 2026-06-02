import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getIronSession } from 'iron-session';
import { sessionOptions, SessionData } from '@/lib/session';

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

  // Extend the session duration if user is active (sliding session)
  if (session.isLoggedIn) {
    await session.save();
  }

  return res;
}

export default proxy;

export const config = {
  // Run proxy/middleware on all paths except some static files
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images).*)'],
};
