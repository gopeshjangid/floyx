import React, { ReactNode } from 'react';
import { Box, styled, Theme } from '@mui/material';

const WrapperContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: '100%',
  borderRadius: '10px',
  bgcolor: theme.palette?.mode === 'light' ? '#fff' : '#0B081F',
  border: `1px solid ${theme.palette?.mode === 'light' ? '#E7F0FC' : 'rgba(255, 255, 255, 0.15)'}`,
}));
const Wrapper = ({ children, ...rest }: { children: ReactNode; mb?: any }) => {
  return <WrapperContainer {...rest}>{children}</WrapperContainer>;
};

export default Wrapper;
