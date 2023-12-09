// next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  /**
   * Extend the built-in session types with your custom session fields.
   */
  interface Session {
    user: {
      accessToken: string;
      refreshToken: string | null;
      expires: number;
      username: string;
      timezone: string | null;
      twoStepLoginRequired: boolean;
    };
    expires: string;
  }
}
