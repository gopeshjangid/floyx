// @ts-nocheck
'use client';
import React from 'react';
import {
  Box,
  Typography,
  useTheme,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { useGetPopularAccountsToFollowQuery } from '@/lib/redux/slices/profile';
import UsernameLink, { ProfileName } from '@/components/usernameLink';
import Link from 'next/link';

const StyledBox = ({ children }: any) => {
  const isMobile = useMediaQuery('(max-width:480px)');
  const { palette } = useTheme();
  return (
    <Box
      sx={{
        maxWidth: !isMobile ? '240px' : '100%',
        backgroundColor: palette.primary[700], // Adjust the color based on your design
        borderRadius: '8px', // Adjust border radius based on your design
        border: `1px solid ${palette.action.border}`, // Adjust border color based on your design
        padding: '16px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {children}
    </Box>
  );
};

const PopularAccountsList = () => {
  const { data, isLoading } = useGetPopularAccountsToFollowQuery({ param: '' });
  const accountsList =
    isLoading && !data ? [1, 2, 3, 4, 5] : data?.result ?? [];
  return (
    <Stack
      gap={2}
      sx={{ maxHeight: '90vh', paddingBottom: '12px', overflowY: 'auto' }}
    >
      {accountsList.map((account, index) => (
        <StyledBox key={'accont-' + index}>
          <Link href={`/profile/${account.username}`}>
            <Box key={index} sx={{ width: '100%' }}>
              <Stack direction="row" gap={1}>
                {account?.avatar ? (
                  <Avatar
                    sx={{ width: 55, height: 55 }}
                    src={account?.avatar}
                  />
                ) : (
                  <Skeleton width={55} variant="circular" height={55} />
                )}
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems={'center'}
                >
                  {isLoading ? (
                    <Skeleton
                      width={'100%'}
                      animation="pulse"
                      variant="rectangular"
                      height={'65px'}
                    />
                  ) : (
                    account && (
                      <Stack alignItems={'flex-start'}>
                        <ProfileName textAlign={'left'} variant="subtitle2">
                          {account?.name}
                        </ProfileName>
                        <Box textAlign={'left'}>
                          <UsernameLink username={account?.username} />
                        </Box>
                      </Stack>
                    )
                  )}
                </Box>
              </Stack>
            </Box>
          </Link>
        </StyledBox>
      ))}
    </Stack>
  );
};

const PopularAccounts = () => {
  return (
    <Stack
      spacing={2}
      mt={5}
      pt={1}
      sx={{ maxHeight: '100vh', overflowY: 'hidden' }}
    >
      <Typography variant="h6" color="textPrimary">
        Popular Accounts
      </Typography>
      <PopularAccountsList />
    </Stack>
  );
};

export default PopularAccounts;
