'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';

import LoginImage from './components/LoginImage';
import SignInGoogle from './components/SignInGoogle';
import SignInFacebook from './components/SignInFacebook';

const SocialLogin: FC = () => {
  const { palette } = useTheme();

  return (
    <Box sx={{ background: '#0B081F' }}>
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
              color={palette.primary.main}
              marginBottom="26px"
            >
              Join for free today and keep your data safe in the digital Space{' '}
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              gap="24px"
              maxWidth="400px"
              marginInline="auto"
            >
              <Box mb="3px">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#D1D0D5',
                    fontSize: '16px',
                    fontWeight: '400',
                    textTransform: 'capitalize',
                    padding: { md: '14px 83px', xs: '14px' },
                    width: { md: '0', xs: '100%' },
                    borderRadius: '10px',
                  }}
                >
                  Use username or email
                </Button>
              </Box>
              <Typography
                variant="h3"
                fontSize="24px"
                fontWeight="600"
                color={palette.primary.main}
                textAlign="left"
              >
                Login to your account
              </Typography>
              <SignInGoogle />
              <SignInFacebook />
              <Box mt="3px">
                <Button
                  variant="outlined"
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                    color: '#D1D0D5',
                    fontSize: '16px',
                    fontWeight: '400',
                    textTransform: 'capitalize',
                    padding: { md: '14px 83px', xs: '14px' },
                    width: { md: '0', xs: '100%' },
                    borderRadius: '10px',
                  }}
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
                  sx={{ '& a': { color: palette.secondary.main } }}
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
                sx={{
                  '& a': {
                    fontSize: '15px',
                    fontWeight: '400',
                    lineHeight: '22.5px',
                    color: palette.secondary.main,
                  },
                }}
                direction="row"
                justifyContent="center"
              >
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
                sx={{ '& a': { color: palette.secondary.main } }}
              >
                © 2022 Powered by Floyx, LLC & <Link href="/"> Polygon.</Link>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SocialLogin;
