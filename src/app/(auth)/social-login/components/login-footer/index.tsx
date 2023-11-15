import React from 'react';
import Link from 'next/link';
import { Box, Stack, Typography, useTheme } from '@mui/material';
import styled from '@emotion/styled';

const LoginFooterWrapper = styled(Box)(() => ({
  marginTop: '54px',
  '& .login-service': {
    '& a': {
      fontSize: '15px',
      fontWeight: '400',
      lineHeight: '22.5px',
      color: '#5798FF',
    },
  },
}));
const LoginFooter = () => {
  const { palette } = useTheme();

  return (
    <LoginFooterWrapper>
      <Stack
        spacing={{
          md: '42px',
          xs: '20px',
        }}
        mb="13px"
        className="login-service"
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
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
        color={palette?.mode === 'light' ? '#85838F' : '#777D88'}
        sx={{ '& a': { color: '#5798FF' } }}
      >
        © {new Date().getFullYear()} Powered by Floyx, LLC & <Link href="/"> Polygon.</Link>
      </Typography>
    </LoginFooterWrapper>
  );
};

export default LoginFooter;
