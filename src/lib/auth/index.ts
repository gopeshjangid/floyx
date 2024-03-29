import {
  FIRST_TIME_LOGIN_USING_SOCIAL,
  FLOYX_TOKEN,
  SOCIAL_SIGNIN_DATA,
  TWO_STEP_AUTH,
} from '@/constants';
import { cookies } from 'next/headers';

export const setAccessTokenCookie = (accessToken: string): void => {
  cookies().set(FLOYX_TOKEN, accessToken, {
    path: '/',
    httpOnly: false,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
};

export const setTwoStepAuthCookie = (isRequired: string): void => {
  cookies().set(TWO_STEP_AUTH, isRequired, {
    path: '/',
    httpOnly: false,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
};

export const setIsFirstTimeLoginUsingSocialMediaCookie = (
  status: string
): void => {
  cookies().set(FIRST_TIME_LOGIN_USING_SOCIAL, status, {
    path: '/',
    httpOnly: false,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
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
    SOCIAL_SIGNIN_DATA,
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
