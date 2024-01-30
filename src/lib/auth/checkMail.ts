import { apiPaths } from '@/constants/apiPaths';
import socialSignIn from './socialSignIn';
// import { setCheckMailCookie } from './index';

export default async function checkMail({
  mail,
  firstname,
  lastname,
  profileimage,
  socialid,
  socialType,
}: any) {
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

    // TODO:

    // if (!user || !response.ok) {
    //   throw new Error('Invalid credentials');
    // }
    console.log('check is first time social media signin', user?.value?.code);

    await socialSignIn({
      email: mail,
      firstname,
      lastname,
      profileimage,
      socialid,
      socialType,
      isFirstTimeLogin: user?.value?.code === 'success' ? true : false,
    });

    return user;
  } catch (error: any) {
    throw new Error(error?.message || 'Server error');
  }
}
