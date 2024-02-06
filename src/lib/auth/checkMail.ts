// import { apiPaths } from '@/constants/apiPaths';
// import socialSignIn from './socialSignIn';
// import {
//   setIsFirstTimeLoginUsingSocialMediaCookie,
//   setSocialSignInCookie,
// } from './index';

// export default async function checkMail({
//   mail,
//   firstname,
//   lastname,
//   profileImage,
//   socialid,
//   socialType,
// }: any) {
//   try {
//     const data = {
//       mail,
//     };

//     const response = await fetch(
//       `${process.env.BACKEND_BASE_DEV_URL}${apiPaths.checkMail}`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       }
//     );
//     const user = await response.json();

//     // TODO:

//     // if (!user || !response.ok) {
//     //   throw new Error('Invalid credentials');
//     // }
//     console.log('check is first time social media signin', user?.value?.code);

//     const isFirstTimeLogin = user?.value?.code === 'success' ? true : false;

//     setSocialSignInCookie({
//       email: mail,
//       firstname,
//       lastname,
//       profileImage,
//       socialid,
//       socialType,
//       isFirstTimeLogin,
//     });

//     if (!isFirstTimeLogin) {
//       await socialSignIn({
//         email: mail,
//         firstname,
//         lastname,
//         profileImage,
//         socialid,
//         socialType,
//         isFirstTimeLogin: false,
//       });
//     } else {
//       setIsFirstTimeLoginUsingSocialMediaCookie('true');
//     }

//     return user;
//   } catch (error: any) {
//     throw new Error(error?.message || 'Server error');
//   }
// }
