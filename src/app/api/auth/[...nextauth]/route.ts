import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';

import signIn from '@/lib/auth/signin';
import socialSignIn from '@/lib/auth/socialSignIn';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      type: 'credentials',
      credentials: {
        email: {},
        password: {},
        remember: {},
      },
      async authorize(credentials) {
        const { email, password, remember }: any = credentials;
        const user = await signIn(email, password, remember);
        if (user?.value?.code === 'success') {
          return user;
        }
        return null;
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
    error: '/login',
    signOut: '/sign-out',
  },

  callbacks: {
    async jwt({ token, user, account, profile, trigger, session }: any) {
      if (account?.provider === 'google' && account?.id_token) {
        const socialSignInResponseInNextAuthFile = await socialSignIn({
          email: token.email,
          firstname: profile.given_name,
          lastname: profile.family_name,
          profileImage: profile.picture,
          socialid: profile.sub,
          socialType: 'google',
        });

        token.socialType = 'google';
        token.email = profile.email;
        token.firstname = profile.given_name;
        token.lastname = profile.family_name;
        token.profileImage = profile.picture;
        token.socialid = profile.sub;
        token.username = socialSignInResponseInNextAuthFile.value.data.username;
      }
      if (account?.provider === 'facebook' && account?.access_token) {
        const socialSignInResponseInNextAuthFile = await socialSignIn({
          mail: token.email,
          firstname: profile.name.split(' ')[0],
          lastname: profile.name.split(' ')[1],
          profileImage: profile.picture.data.url,
          socialid: profile.id,
          socialType: 'facebook',
        });
        token.socialType = 'facebook';
        token.email = profile.email;
        token.firstname = profile.name.split(' ')[0];
        token.lastname = profile.name.split(' ')[1];
        token.profileImage = profile.picture.data.url;
        token.socialid = profile.id;
        token.username = socialSignInResponseInNextAuthFile.value.data.username;
      }
      if (user?.value?.code === 'success') {
        token.accessToken = user.value.data.token;
        token.username = user.value.data.username;
        token.timezone = user.value.data.timezone;
        token.twoStepLoginRequired = user.value.data.twoStepLoginRequired;
      }

      if (trigger === 'update') {
        token.username = session.username;
      }
      return token;
    },
    session({ session, token, trigger }: any) {
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
        session.user.username = token.username;
      }

      if (trigger === 'update') {
        session.user.username = token.username;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
