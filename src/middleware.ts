import { withAuth } from 'next-auth/middleware';

export default withAuth({
  pages: {
    signIn: '/social-login',
    error: '/social-login',
  },
});

export const config = {
  matcher: ['/', '/notifications'],
};
