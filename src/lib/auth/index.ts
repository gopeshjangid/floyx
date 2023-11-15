import { cookies } from 'next/headers';

export const setAccessTokenCookie = (accessToken: string): void => {
  cookies().set('FLOYX_TOKEN', accessToken, {
    path: '/',
    httpOnly: false,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
};

export const getAccessTokenCookie = () => {
  return cookies().get('FLOYX_TOKEN');
};
