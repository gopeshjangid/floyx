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
import { useSession } from 'next-auth/react';
import { useGetBonusTaskStatusQuery } from '@/lib/redux/slices/earnings';

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
  const { data, isLoading } = useGetBonusTaskStatusQuery();
  const accountsList = isLoading && !data ? [1, 2, 3, 4, 5] : data;

  return (
    <Stack gap={2}>
      {accountsList.map((account, index) => (
        <StyledBox>
          <Box key={index} sx={{ width: '100%' }}>
            <Stack direction="row" gap={2}>
              {account?.avatar ? (
                <Avatar src={account?.avatar} />
              ) : (
                <Skeleton width={55} variant="circular" height={55} />
              )}
              <Box display="flex" flexDirection="column">
                <Typography variant="body1" color="textPrimary">
                  {account?.name ?? <Skeleton width={80} variant="text" />}
                </Typography>
                <Typography variant="body1" color="primary">
                  {account?.username ?? <Skeleton width={80} variant="text" />}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </StyledBox>
      ))}
    </Stack>
  );
};

const PopularAccounts = () => {
  const { status, data } = useSession();
  return (
    <Stack spacing={2} mt={2} pt={1}>
      <Typography variant="h6" color="textPrimary">
        Popular Accounts
      </Typography>
      <PopularAccountsList />
    </Stack>
  );
};

export default PopularAccounts;
