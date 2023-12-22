import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse, userAgent } from 'next/server';

export default withAuth({
  pages: {
    signIn: '/login',
    // error: '/social-login',
  },
  secret: 'HBgBGs3QXQ7Efmu/FFyzXcKGnhbipvw0ArDme0SYD2o=',
});

export function middleware(request: NextRequest) {
  const uaString = request.headers.get('user-agent') || '';
  const isMobile = /mobile/i.test(uaString);
  const deviceType = isMobile ? 'mobile' : 'desktop';

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
  ],
};
