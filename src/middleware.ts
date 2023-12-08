import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/social-login',
    error: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
// WARN: Add all protected routes, do not use REGEX and do not try to create function or something that returns array
export const config = {
  matcher: ['/', '/notifications', '/people', '/settings', '/inbox', '/earnings', '/profile'],
};
