'use client';

import React from 'react';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import FloyxImage from '@/iconComponents/floyxIcon';
import { deleteCookie } from 'cookies-next';
import { FIRST_TIME_LOGIN_USING_SOCIAL, SOCIAL_SIGNIN_DATA } from '@/constants';

export default function SignOut() {
  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async () => {
    deleteCookie('FLOYX_TOKEN');
    deleteCookie('next-auth.session-token');
    deleteCookie(SOCIAL_SIGNIN_DATA);
    deleteCookie(FIRST_TIME_LOGIN_USING_SOCIAL);
    await signOut({
      redirect: true,
      callbackUrl: '/social-login',
    });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: '100vh', borderTop: '2px solid primary' }}
    >
      <Grid item xs={12} md={5} xl={4} className="my-5">
        <Typography variant="h1" component="h1" align="center" gutterBottom>
          <Box mb={5}>
            <FloyxImage
              fill={
                theme.palette.mode === 'dark'
                  ? theme.palette.common.white
                  : theme.palette.common.black
              }
            />
          </Box>
          Sign out
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          align="center"
          paragraph
          mb={2}
        >
          Are you sure you want to sign out?
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          style={{ marginBottom: '10px' }}
          onClick={() => router.back()}
        >
          Go back
        </Button>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          fullWidth
          onClick={handleSubmit}
        >
          Sign out
        </Button>
      </Grid>
    </Grid>
  );
}
