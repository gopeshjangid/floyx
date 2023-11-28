import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

import signIn from '@/lib/auth/signin';
import socialSignIn from '@/lib/auth/socialSignIn';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
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
        return signIn(email, password, remember);
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
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/social-login',
    error: '/social-login',
  },

  callbacks: {
    async jwt({ token, user, account, profile }: any) {
      if (account?.provider === 'google' && account?.id_token) {
        token.socialType = 'google';
        token.email = profile.email;
        token.firstname = profile.given_name;
        token.lastname = profile.family_name;
        token.profileImage = profile.picture;
        token.socialid = profile.sub;

        await socialSignIn({
          email: token.email,
          firstname: profile.given_name,
          lastname: profile.family_name,
          profileImage: profile.picture,
          socialid: profile.sub,
          socialType: 'google',
        });
      }
      if (account?.provider === 'facebook' && account?.access_token) {
        token.socialType = 'facebook';
        token.email = profile.email;
        token.firstname = profile.name.split(' ')[0];
        token.lastname = profile.name.split(' ')[1];
        token.profileImage = profile.picture.data.url;
        token.socialid = profile.id;

        await socialSignIn({
          email: profile.email,
          firstname: profile.name.split(' ')[0],
          lastname: profile.name.split(' ')[1],
          profileImage: profile.picture.data.url,
          socialid: profile.id,
          socialType: 'facebook',
        });
      }
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
      if (token.socialType) {
        session.user.socialType = token.socialType;
        session.user.email = token.email;
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
        session.user.profileImage = token.profileImage;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
