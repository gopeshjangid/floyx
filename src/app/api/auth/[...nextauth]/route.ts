/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: {},
        password: {},
        remember: {},
      },
      async authorize(credentials) {
        const { email, password, remember }: any = credentials;
        try {
          const response = await fetch(
            `${process.env.BACKEND_BASE_URL}/api/v1/identity/signin`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name: email, password, remember }),
            }
          );
          const user = await response.json();
          if (!user || !response.ok) {
            throw new Error('invalid credentials');
          }
          return user;
        } catch (error: any) {
          throw new Error(error?.message || 'server error');
        }
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
  callbacks: {
    async jwt({ token, user }: any) {
      if (user?.value?.code === 'success') {
        token.accessToken = user.value.data.token;
        token.username = user.value.data.username;
        token.timezone = user.value.data.timezone;
        token.twoStepLoginRequired = user.value.data.twoStepLoginRequired;
      }
      return token;
    },
    session({ session, token }: any) {
      if (token && session.user) {
        session.user.token = token.accessToken;
        session.user.username = token.username;
        session.user.timezone = token.timezone;
        session.user.twoStepLoginRequired = token.twoStepLoginRequired;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
