import React, { ReactNode } from 'react';
import { Box, styled, SxProps, Theme } from '@mui/material';

const WrapperContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: '100%',
  borderRadius: '10px',
  background: theme.palette?.mode === 'light' ? '#fff' : '#0B081F',
  border: `1px solid ${
    theme.palette?.mode === 'light' ? '#E7F0FC' : 'rgba(255, 255, 255, 0.15)'
  }`,
  marginTop: '20px',
  maxWidth: '98%',
}));
const Wrapper = ({
  children,
  ...rest
}: {
  children: ReactNode;
  mb?: any;
  sx?: SxProps<Theme> | undefined;
}) => {
  return <WrapperContainer {...rest}>{children}</WrapperContainer>;
};

export default Wrapper;
