import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: {},
        password: {},
      },
      authorize(credentials) {
        const { email, password }: any = credentials;
        // TODO: axios call to backend
        const user = {
          id: '1234',
          name: 'Admin',
          email: 'admin@gmail.com',
          password: 'admin@1232',
          role: 'admin',
        };
        if (email !== user.email || password !== user.password) {
          throw new Error('invalid credentials');
        }
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
  ],
  //   callbacks: {
  //     async jwt({ token, user }: any) {
  //       if (user) {
  //         token.role = user.role;
  //       }
  //       return token;
  //     },
  //     session({ session, token }: any) {
  //       if (token && session.user) {
  //         session.user.role = token.role;
  //       }
  //       return session;
  //     },
  //   },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
