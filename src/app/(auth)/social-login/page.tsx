'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import {
  Box,
  Button,
  Grid,
  Stack,
  Theme,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { useRouter } from 'next/navigation';

import LoginImage from './components/login-image';
import SignInGoogle from './components/sign-in-google';
import SignInFacebook from './components/sign-in-facebook';
import { allRoutes } from '@/constants/allRoutes';

const SocialLoginWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  background: theme.palette.background.default,
  '& .outline-btn': {
    borderColor: 'rgba(255, 255, 255, 0.15)',
    textTransform: 'initial',
    color: '#D1D0D5',
    fontSize: '16px',
    width: '100%',
    borderRadius: '10px',
  },
  '& .login-service': {
    '& a': {
      fontSize: '15px',
      fontWeight: '400',
      lineHeight: '22.5px',
      color: theme.palette.primary.main,
    },
  },
}));

const SocialLogin: FC = () => {
  const { palette } = useTheme();
  const router = useRouter();
  return (
    <SocialLoginWrapper>
      <Grid container minHeight="100vh">
        <LoginImage />
        <Grid item md={6} sm={12}>
          <Box
            textAlign="center"
            padding={{ md: '113px 15px 40px', xs: '38px 25px 38px' }}
          >
            <Typography
              variant="h5"
              fontSize="16px"
              color={palette.text.primary}
              marginBottom="26px"
            >
              Join for free today and keep your data safe in the digital Space{' '}
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              gap="24px"
              maxWidth="360px"
              marginInline="auto"
            >
              <Box mb="3px">
                <Button
                  variant="outlined"
                  className="outline-btn"
                  onClick={() => router.push(allRoutes.register)}
                >
                  Create an account
                </Button>
              </Box>
              <Typography
                variant="h3"
                fontSize="24px"
                fontWeight="600"
                color={palette.text.primary}
                textAlign="left"
              >
                Login to your account
              </Typography>
              <SignInGoogle />
              <SignInFacebook />
              <Box mb="3px">
                <Button
                  variant="outlined"
                  className="outline-btn"
                  onClick={() => router.push(allRoutes.login)}
                >
                  Use username or email
                </Button>
              </Box>
              <Box mt="3px">
                <Typography
                  variant="h6"
                  fontSize="16px"
                  fontWeight="400"
                  lineHeight="24px"
                  color="#CECED2"
                  sx={{ '& a': { color: palette.primary.main} }}
                >
                  By signing up,you agree to
                  <Link href="/"> Terms of Service </Link> and
                  <Link href="/"> Privacy Policy, </Link>
                  including <Link href="/"> Cookie Use.</Link>
                </Typography>
              </Box>
            </Box>
            <Box mt="54px">
              <Stack
                spacing={{
                  md: '42px',
                  xs: '20px',
                }}
                mb="13px"
                className="login-service"
                direction="row"
                justifyContent="center"
                flexWrap='wrap' >
                <Link href="/"> Terms of service</Link>
                <Link href="/"> Privacy Policy</Link>
                <Link href="/"> Cookie use</Link>
              </Stack>
              <Typography
                variant="h6"
                fontSize="16px"
                fontWeight="400"
                lineHeight="24px"
                color="#85838F"
                sx={{ '& a': { color: palette.primary.main} }}
              >
                © 2022 Powered by Floyx, LLC & <Link href="/"> Polygon.</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </SocialLoginWrapper>
  );
};

export default SocialLogin;
