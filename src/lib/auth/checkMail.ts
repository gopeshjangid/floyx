import { apiPaths } from '@/constants/apiPaths';
// import { setCheckMailCookie } from './index';

export default async function checkMail({ mail }: any) {
  try {
    const data = {
      mail,
    };

    const response = await fetch(
      `${process.env.BACKEND_BASE_DEV_URL}${apiPaths.checkMail}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const user = await response.json();

    // if (!user || !response.ok) {
    //   throw new Error('Invalid credentials');
    // }

    console.log('check mail response', user);
    // setCheckMailCookie(user?.value?.data?.token.accessToken);
    return user;
  } catch (error: any) {
    throw new Error(error?.message || 'Server error');
  }
}
