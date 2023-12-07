'use client';

import React from 'react';
import { Box, List, Skeleton, Theme, styled } from '@mui/material';

import Wrapper from '@/components/wrapper';
import { SettingWrapper } from '../styled';

const BlockedUserWrapper = styled(Box)(
  ({ theme }: { theme: Theme }) => ({
    padding: '0',
    '& .MuiList-root': {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 15,
      '& .MuiSkeleton-root': {
        transform: 'scale(1)',
        height: 50,
        '&.MuiSkeleton-circular': {
          width: '50px',
          height: '50px',
        },
        '&.MuiSkeleton-text': { flex: 1 },
      },
      [theme.breakpoints.up('md')]: {
        '& .MuiList-root': {
          gap: 15,
        },
        '& .MuiSkeleton-root': {
          height: 65,
          '&.MuiSkeleton-circular': {
            width: '59px',
            height: '59px',
          },
        },
      },
    },
  })
);

const BlockedUserLoader = () => {
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
          <BlockedUserWrapper>
            <List component="ul">
              {Array.from(new Array(5)).map((_, index) => (
                <Box key={index} display="flex" gap={2} flexDirection="row">
                  <Skeleton variant="circular" />
                  <Skeleton variant="text" />
                </Box>
              ))}
            </List>
          </BlockedUserWrapper>
        </SettingWrapper>
      </Wrapper>
    </>
  );
};

export default BlockedUserLoader;
