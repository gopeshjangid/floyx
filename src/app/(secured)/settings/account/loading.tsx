'use client';

import React from 'react';
import { Divider, Skeleton, Stack } from '@mui/material';

import Wrapper from '@/components/wrapper';
import { SettingWrapper } from '../styled';

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
        <SettingWrapper>
          <Stack>
            <Skeleton variant="text" width="15%" height="40px" />
            <Skeleton variant="text" width="100%" height="70px" />

            <Skeleton variant="text" width="15%" height="40px" />
            <Skeleton variant="text" width="100%" height="70px" />

            <Skeleton variant="text" width="15%" height="40px" />
            <Skeleton variant="text" width="100%" height="70px" />

            <Skeleton variant="text" width="100%" height="50px" />
            <Skeleton variant="text" width="100%" height="50px" />
          </Stack>

          <Divider sx={{ margin: '10px 0' }} />
          <Skeleton variant="text" width="30%" height="60px" />
          <Skeleton variant="text" width="100%" height="50px" />
          <Skeleton variant="text" width="100%" height="70px" />
        </SettingWrapper>
      </Wrapper>
    </>
  );
};

export default AccountSettingSkeleton;
