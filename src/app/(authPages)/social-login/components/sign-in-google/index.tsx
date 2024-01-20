import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Box, Button, styled } from '@mui/material';

import { iconGoogle } from '@/assets/images';
import { allRoutes } from '@/constants/allRoutes';
const SignInGoogleWrapper = styled(Box)(() => ({
  '& .MuiButton-root': {
    background: '#4285F4 !important',
    width: '100%',
    fontSize: '16px',
    fontWeight: '400',
    color: '#fff',
    textTransform: 'capitalize',
    '& .MuiButton-startIcon': {
      margin: '0',
      position: 'absolute',
      left: '8px',
    },
  },
}));

const SignInGoogle = () => {
  const handleGoogleLogin = async () => {
    await signIn('google', {
      callbackUrl: allRoutes.home,
    });
  };

  return (
    <SignInGoogleWrapper>
      <Button
        variant="contained"
        startIcon={<Image src={iconGoogle} alt="google" />}
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </Button>
    </SignInGoogleWrapper>
  );
};

export default SignInGoogle;
