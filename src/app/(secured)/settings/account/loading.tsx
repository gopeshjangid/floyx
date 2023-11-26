'use client';

import React from 'react';
import { Box, Divider, Skeleton, Stack, Theme, styled } from '@mui/material';
import Wrapper from '@/components/wrapper';

const AccountWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  '& .MuiInputBase-root': {
    background: theme.palette.background.default,
  },
  margin: '25px',
  [theme.breakpoints.up('md')]: {
    margin: '50px',
  },
}));

const AccountSettingSkeleton = () => {
  return (
    <>
      <Skeleton variant="text" width="20%" height="60px" />

      <Wrapper
        sx={{
          maxWidth: {
            xs: '100%',
            sm: '70%',
          },
          marginTop: '20px',
        }}
      >
        <AccountWrapper>
          <Stack>
            <Skeleton variant="text" width="15%" height="40px" />
            <Skeleton variant="text" width="100%" height="80px" />

            <Skeleton variant="text" width="15%" height="40px" />
            <Skeleton variant="text" width="100%" height="80px" />

            <Skeleton variant="text" width="15%" height="40px" />
            <Skeleton variant="text" width="100%" height="80px" />

            <Skeleton variant="text" width="100%" height="50px" />
            <Skeleton variant="text" width="100%" height="50px" />
          </Stack>

          <Divider sx={{ margin: '10px 0' }} />
          <Skeleton variant="text" width="30%" height="60px" />
          <Skeleton variant="text" width="100%" height="50px" />
          <Skeleton variant="text" width="100%" height="80px" />
        </AccountWrapper>
      </Wrapper>
    </>
  );
};

export default AccountSettingSkeleton;
