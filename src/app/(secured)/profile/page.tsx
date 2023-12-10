// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import { Box, Skeleton } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Page: React.FC = () => {
  const params = useParams();
  const session = useSession();
  const router = useRouter();
  if (
    !params?.username &&
    session.data?.user?.username &&
    session.status === 'authenticated'
  ) {
    router.push(`/profile/${session.data?.user?.username}`);
    return;
  }

  return (
    <Box p={1} mt={5}>
      <Skeleton variant="circular" width="50px" height="50px" />
      <Skeleton variant="rounded" width="100%" height="200px" />
      <Skeleton variant="rounded" width="100%" height="200px" />
    </Box>
  );
};

export default Page;
