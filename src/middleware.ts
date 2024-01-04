import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default withAuth({
  pages: {
    signIn: '/login',
    // error: '/social-login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  console.log('middleware ~ token:', token);
  const isPrivateRoute = config.matcher.includes(request.nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname);
  // Redirect to login page if trying to access a private route without a session
  if (!token && isPrivateRoute && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = '/login'; // The login page route
    return NextResponse.redirect(url);
  }

  // Set device type cookie if not set or different
  const uaString = request.headers.get('user-agent') || '';
  const isMobile = /mobile/i.test(uaString);
  const deviceType = isMobile ? 'mobile' : 'desktop';
  const currentDeviceType = request.cookies.get('deviceType');

  const response = NextResponse.next();
  response.cookies.set(
    'routeType',
    isPrivateRoute ? 'private' : isPublicRoute ? 'public' : 'private'
  );
  if (currentDeviceType?.value !== deviceType) {
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
    '/articles',
    '/inbox',
    '/earnings',
    '/profile',
    '/composer/create',
  ],
};

const publicRoutes = ['/post', '/article', '/profile'];
