import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/login',
    // error: '/social-login',
  },
  secret: 'HBgBGs3QXQ7Efmu/FFyzXcKGnhbipvw0ArDme0SYD2o=',
});
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
