import { apiPaths } from '@/constants/apiPaths';
import { setAccessTokenCookie } from './index';

export default async function signIn(
  email: string,
  password: string,
  remember: boolean
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_DEV_URL}${apiPaths.login}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: email, password, remember }),
      }
    );
    const user = await response.json();
    setAccessTokenCookie(user?.value?.data?.token.accessToken);
    if (!user || !response.ok) {
      throw new Error('Invalid credentials');
    }
    return user;
  } catch (error: any) {
    throw new Error(error?.message || 'Server error');
  }
}
