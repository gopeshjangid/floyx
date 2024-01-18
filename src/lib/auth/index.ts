import { cookies } from 'next/headers';

export const setAccessTokenCookie = (accessToken: string): void => {
  cookies().set('FLOYX_TOKEN', accessToken, {
    path: '/',
    httpOnly: false,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
};

export const setCheckMailCookie = (email: string): void => {
  cookies().set('CHECK_EMAIL', email, {
    path: '/',
    httpOnly: false,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
};

export const getAccessTokenCookie = () => {
  return cookies().get('FLOYX_TOKEN');
};

export const setSocialSignInCookie = ({
  email,
  firstname,
  lastname,
  profileImage,
  socialid,
  socialType,
  isFirstTimeLogin,
}: any) => {
  cookies().set(
    'SOCIAL_SIGNIN_DATA',
    JSON.stringify({
      email,
      firstname,
      lastname,
      profileImage,
      socialid,
      socialType,
      isFirstTimeLogin,
    }),
    {
      path: '/',
      httpOnly: false,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    }
  );
};
