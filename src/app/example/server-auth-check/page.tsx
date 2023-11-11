import React from 'react';
import { getServerSession } from 'next-auth';

// This page is for checking auth on server component

const ServerAuthCheck = async () => {
  const session = await getServerSession();

//   if (!session) {
//     redirect('/login')
// }

  return <div>ServerAuthCheck Session : {JSON.stringify(session)}</div>;
};

export default ServerAuthCheck;
