import React from 'react';
import { useTheme } from '@emotion/react';
import Image from 'next/image';
import { Box, Button } from '@mui/material';

import { iconGoogle } from '@/assets/images';

const SignInGoogle = () => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        '& .MuiButton-root': {
          background: '#4285F4 !important',
          padding: { md: '13px 100px', xs: '14px' },
          width: { md: '0', xs: '100%' },
          fontSize: '16px',
          fontWeight: '400',
          color: palette.primary.main,
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
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default SignInGoogle;
