'use client';

import React, { FC } from 'react';
import Link from 'next/link';
import { Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';

import SignInGoogle from './components/sign-in-google';
// import SignInFacebook from './components/sign-in-facebook';
import { allRoutes } from '@/constants/allRoutes';
import LoginFooter from './components/login-footer';
import { useTranslation } from 'react-i18next';

const SocialLogin: FC = () => {
  const { palette } = useTheme();
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <Grid item md={6} sm={12}>
      <Box
        textAlign="center"
        padding={{ md: '113px 15px 40px', xs: '38px 25px 38px' }}
      >
        <Typography
          translate="no"
          variant="h5"
          fontSize="16px"
          color={palette.text.primary}
          marginBottom="26px"
        >
          {t('auth.sLogin.text.text1')} 
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
              translate="no"
              variant="outlined"
              className="outline-btn"
              onClick={() => router.push(allRoutes.register)}
            >
              {t('auth.sLogin.text.text2')}
            </Button>
          </Box>
          <Typography
            translate="no"
            variant="h3"
            fontSize="24px"
            fontWeight="600"
            color={palette.text.primary}
            textAlign="left"
          >
            {t('auth.sLogin.text.text3')}
          </Typography>
          <SignInGoogle />
          {/* TODO: add fb in future */}
          {/* <SignInFacebook /> */}
          <Box mb="3px">
            <Button
              translate="no"
              variant="outlined"
              className="outline-btn"
              onClick={() => router.push(allRoutes.login)}
            >
              {t('auth.sLogin.text.text4')}
            </Button>
          </Box>
          <Box mt="3px">
            <Typography
              translate="no"
              variant="h6"
              fontSize="16px"
              fontWeight="400"
              lineHeight="24px"
              color={palette.primary[300]}
              sx={{ '& a': { color: '#5798FF' } }}
            >
              {t('auth.sLogin.text.text5')}
              <Link prefetch={false} href={allRoutes.termsAndConditions}>
                {t('auth.sLogin.text.text6')}
              </Link>{' '}
              and
              <Link prefetch={false} href={allRoutes.privacyPolicy}>
                {' '}
                {t('auth.sLogin.text.text7')}{' '}
              </Link>
              including
              <Link prefetch={false} href={allRoutes.cookiesPolicy}>
                {' '}
                {t('auth.sLogin.text.text8')}
              </Link>
            </Typography>
          </Box>
        </Box>
        <Box translate="no" py={1} sx={{ '& a': { color: '#5798FF' } }}>
          <Link href="/tokenPanel">{t('auth.sLogin.text.text9')}</Link>
        </Box>
        <LoginFooter hideLinks />
      </Box>
    </Grid>
  );
};

export default SocialLogin;
