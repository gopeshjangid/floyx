import React from 'react';
import Image from 'next/image';
import { Box, Button, useTheme } from '@mui/material';

import { iconFacebook } from '@/assets/images';

const SignInFacebook = () => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        '& .MuiButton-root': {
          padding: { md: '13px 80px 13px 100px', xs: '14px' },
          width: { md: 'fit-content', xs: '100%' },
          background: '#4267B2 !important',
          fontSize: '16px',
          color: palette.primary.main,
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
      >
        Sign in with Facebook
      </Button>
    </Box>
  );
};

export default SignInFacebook;
