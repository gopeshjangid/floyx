import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse, userAgent } from 'next/server';

export default withAuth({
  pages: {
    signIn: '/login',
    // error: '/social-login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export function middleware(request: NextRequest) {
  const uaString = request.headers.get('user-agent') || '';
  const hasSession = request.cookies.get('next-auth.session-token');
  const isPrivateRoute = config.matcher.includes(request.nextUrl.pathname);
  const isMobile = /mobile/i.test(uaString);
  const deviceType = isMobile ? 'mobile' : 'desktop';

  if (!hasSession?.value && isPrivateRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login'; // The login page route
    return NextResponse.redirect(url);
  }
  // Store the device type in a cookie or a custom header
  const response = NextResponse.next();
  response.cookies.set('deviceType', deviceType);

  return response;
}
// WARN: Add all protected routes, do not use REGEX and do not try to create function or something that returns array
export const config = {
  matcher: [
    '/',
    '/notifications',
    '/people',
    '/settings',
    '/inbox',
    '/earnings',
    '/profile',
    '/composer/create',
  ],
};
