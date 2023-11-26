'use client';

import React from 'react';
import { Skeleton, Stack } from '@mui/material';

import Wrapper from '@/components/wrapper';
import { SettingWrapper } from '../styled';

const ChangePasswordLoader = () => {
  return (
    <>
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
            <Skeleton variant="text" width="100%" height="80px" />

            <Skeleton variant="text" width="15%" height="40px" />
            <Skeleton variant="text" width="100%" height="80px" />

            <Skeleton variant="text" width="15%" height="40px" />
            <Skeleton variant="text" width="100%" height="80px" />
          </Stack>

          <Skeleton variant="text" width="100%" height="80px" />
        </SettingWrapper>
      </Wrapper>
    </>
  );
};

export default ChangePasswordLoader;
