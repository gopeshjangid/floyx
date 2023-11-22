'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';

import SignInGoogle from './components/sign-in-google';
import SignInFacebook from './components/sign-in-facebook';
import { allRoutes } from '@/constants/allRoutes';
import LoginFooter from './components/login-footer';

const SocialLogin: FC = () => {
  const { palette } = useTheme();
  const router = useRouter();

  return (
    <Grid item md={6} sm={12}>
      <Box textAlign="center" padding={{ md: '113px 15px 40px', xs: '38px 25px 38px' }}>
        <Typography variant="h5" fontSize="16px" color={palette.text.primary} marginBottom="26px">
          Join for free today and keep your data safe in the digital Space{' '}
        </Typography>
        <Box display="flex" flexDirection="column" gap="24px" maxWidth="360px" marginInline="auto">
          <Box mb="3px">
            <Button variant="outlined" className="outline-btn" onClick={() => router.push(allRoutes.register)}>
              Create an account
            </Button>
          </Box>
          <Typography variant="h3" fontSize="24px" fontWeight="600" color={palette.text.primary} textAlign="left">
            Login to your account
          </Typography>
          <SignInGoogle />
          <SignInFacebook />
          <Box mb="3px">
            <Button variant="outlined" className="outline-btn" onClick={() => router.push(allRoutes.login)}>
              Use username or email
            </Button>
          </Box>
          <Box mt="3px">
            <Typography
              variant="h6"
              fontSize="16px"
              fontWeight="400"
              lineHeight="24px"
              color={palette.primary[200]}
              sx={{ '& a': { color: '#5798FF' } }}
            >
              By signing up,you agree to
              <Link href="/"> Terms of Service </Link> and
              <Link href="/"> Privacy Policy, </Link>
              including <Link href="/"> Cookie Use.</Link>
            </Typography>
          </Box>
        </Box>
        <LoginFooter />
      </Box>
    </Grid>
  );
};

export default SocialLogin;
