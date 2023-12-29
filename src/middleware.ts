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
  const hasSession = request.cookies.get('next-auth.session-token');
  const isPrivateRoute = config.matcher.includes(request.nextUrl.pathname);

  // Redirect to login page if trying to access a private route without a session
  if (!hasSession?.value && isPrivateRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login'; // The login page route
    return NextResponse.redirect(url);
  }

  // Set device type cookie if not set or different
  const uaString = request.headers.get('user-agent') || '';
  const isMobile = /mobile/i.test(uaString);
  const deviceType = isMobile ? 'mobile' : 'desktop';
  const currentDeviceType = request.cookies.get('deviceType');

  if (currentDeviceType?.value !== deviceType) {
    const response = NextResponse.next();
    response.cookies.set('deviceType', deviceType);
    return response;
  }

  return NextResponse.next();
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
