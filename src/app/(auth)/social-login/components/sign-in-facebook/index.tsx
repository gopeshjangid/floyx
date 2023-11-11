import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Box, Button, useTheme } from '@mui/material';

import { iconFacebook } from '@/assets/images';
import { allRoutes } from '@/constants/allRoutes';

const SignInFacebook = () => {
  const { palette } = useTheme();

  const handleFacebookLogin = async () => {
    await signIn('facebook', {
      callbackUrl: allRoutes.home,
    });
  };

  return (
    <Box
      sx={{
        '& .MuiButton-root': {
          width: '100%',
          background: '#4267B2 !important',
          fontSize: '16px',
          color: palette.text.primary,
          fontWeight: '400',
          textTransform: 'capitalize',
          '& .MuiButton-startIcon': {
            margin: '0',
            position: 'absolute',
            left: '8px',
          },
        },
      }}
    >
      <Button
        variant="contained"
        startIcon={<Image src={iconFacebook} alt="google" />}
        onClick={handleFacebookLogin}
      >
        Sign in with Facebook
      </Button>
    </Box>
  );
};

export default SignInFacebook;
