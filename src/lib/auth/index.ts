import { JWT } from 'next-auth/jwt';
import { cookies } from 'next/headers';

export const setAccessTokenCookie = (accessToken: string): void => {
  cookies().set('accessToken', accessToken, {
    path: '/',
    httpOnly: false,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
};

export const getAccessTokenCookie = (): JWT | undefined => {
  return cookies().get('accessToken');
};
