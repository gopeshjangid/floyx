'use client';

import React from 'react';
import Image from 'next/image';
import { Box, Grid, Theme, Typography, styled } from '@mui/material';

import { iconLogo, imgLogin, imgLoginBG } from '@/assets/images';

const ImageLogin = styled(Box)(({ theme }: { theme: Theme }) => ({
  textAlign: 'center',
  '& img': { height: '278px', objectFit: 'contain' },
  '& .login-image-content': {
    '& .MuiTypography-h5': {
      color: '#fff',
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '52px',
      textTransform: 'capitalize',
    },
  },
  [theme.breakpoints.up('md')]: {
    '& img': { height: 'auto' },
    '& .img-overlay': { borderRadius: '0' },
  },
}));

const LoginImage = () => {
  return (
    <Grid item md={6} sm={12} width="100%">
      <Box
        height="100%"
        width="100%"
        position="relative"
        sx={{
          '& img': { maxWidth: '100%' },
          '& .img-overlay': {
            position: 'absolute',
            inset: '0',
            width: '100%',
            height: '100%',
            borderRadius: { md: '0', xs: '0px 0px 30px 30px' },
          },
        }}
      >
        <Image src={imgLoginBG} alt="login bg" className="img-overlay" priority />
        <Box position="relative" padding={{ md: '110px 15px 10px', xs: '38px 15px 0' }}>
          <Box className="login-image-content" textAlign="center">
            <Image src={iconLogo} alt="logo" loading="lazy" />
            <Typography variant="h5" fontWeight="500">
              No <span className="gradient-text">censorship </span> & Strong <span className="gradient-text">Security</span>
            </Typography>
          </Box>
          <ImageLogin>
            <Image src={imgLogin} alt="login" loading="lazy" quality={100} />
          </ImageLogin>
        </Box>
      </Box>
    </Grid>
  );
};

export default LoginImage;
