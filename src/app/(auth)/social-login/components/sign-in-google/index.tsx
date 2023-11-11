import React from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { Box, Button, useTheme } from '@mui/material';

import { iconGoogle } from '@/assets/images';
import { allRoutes } from '@/constants/allRoutes';

const SignInGoogle = () => {
  const { palette } = useTheme();

  const handleGoogleLogin = async () => {
    await signIn('google', {
      callbackUrl: allRoutes.home,
    });
  };

  return (
    <Box
      sx={{
        '& .MuiButton-root': {
          background: '#4285F4 !important',
          width: '100%',
          fontSize: '16px',
          fontWeight: '400',
          color: palette.text.primary,
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
        startIcon={<Image src={iconGoogle} alt="google" />}
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default SignInGoogle;
