import { apiPaths } from '@/constants/apiPaths';
import { setAccessTokenCookie } from './index';

export default async function socialSignIn({
  email,
  firstname,
  lastname,
  profileImage,
  socialid,
  socialType,
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
      `${process.env.BACKEND_BASE_URL}${apiPaths.socialLogin}`,
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
    return user;
  } catch (error: any) {
    throw new Error(error?.message || 'Server error');
  }
}
