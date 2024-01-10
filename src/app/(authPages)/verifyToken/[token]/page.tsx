'use client';

import { Box, Skeleton, Stack } from '@mui/material';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { allRoutes } from '@/constants/allRoutes';
import { useVerifyTokenMutation } from '@/lib/redux/slices/registration';

const VerifyToken = () => {
  const router = useRouter();
  const [verifyToken, { data, isLoading, error }] = useVerifyTokenMutation();
  console.log('VerifyToken ~ data:', data);
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    if (token) {
      verifyToken({
        token,
      });
    }
  }, [token]);

  useEffect(() => {
    if (data === 'success') {
      router.push(allRoutes.login);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      router.push(allRoutes.login);
    }
  }, [error]);

  useEffect(() => {
    if (isLoading) {
      <Box
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        margin="auto"
      >
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width={500} height={60} />
          <Skeleton variant="rounded" width={500} height={60} />

          <Skeleton variant="rectangular" width={500} height={60} />
          <Skeleton variant="rounded" width={500} height={60} />

          <Skeleton variant="rectangular" width={500} height={60} />
          <Skeleton variant="rounded" width={500} height={60} />
        </Stack>
      </Box>;
    }
  }, [isLoading]);

  return (
    <Box
      textAlign="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin="auto"
    >
      <Stack spacing={1}>
        <Skeleton variant="rectangular" width={500} height={60} />
        <Skeleton variant="rounded" width={500} height={60} />

        <Skeleton variant="rectangular" width={500} height={60} />
        <Skeleton variant="rounded" width={500} height={60} />

        <Skeleton variant="rectangular" width={500} height={60} />
        <Skeleton variant="rounded" width={500} height={60} />
      </Stack>
    </Box>
  );
};

export default VerifyToken;
