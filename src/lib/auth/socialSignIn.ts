import { apiPaths } from '@/constants/apiPaths';
import { setAccessTokenCookie, setSocialSignInCookie } from './index';

export default async function socialSignIn({
  email,
  firstname,
  lastname,
  profileImage,
  socialid,
  socialType,
  isFirstTimeLogin,
}: any) {
  try {
    const data = {
      email,
      responseSocialloginDetails: [
        {
          firstname,
          lastname,
          email,
          profileImage,
          socialid,
          socialType,
        },
      ],
    };

    const response = await fetch(
      `${process.env.BACKEND_BASE_DEV_URL}${apiPaths.socialLogin}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const user = await response.json();

    if (!user || !response.ok) {
      throw new Error('Invalid credentials');
    }
    setAccessTokenCookie(user?.value?.data?.token.accessToken);
    setSocialSignInCookie({
      email,
      firstname,
      lastname,
      profileImage,
      socialid,
      socialType,
      isFirstTimeLogin,
    });

    return user;
  } catch (error: any) {
    throw new Error(error?.message || 'Server error');
  }
}
