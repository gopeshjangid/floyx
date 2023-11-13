import React, { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';

const Wrapper = ({ children, ...rest }: { children: ReactNode }) => {
  const { palette } = useTheme();

  return (
    <Box
      sx={{
        width: '100%',
        borderRadius: '10px',
        bgcolor: palette?.mode === 'light' ? '#fff' : '#0B081F',
        border: `1px solid ${palette?.mode === 'light' ? '#E7F0FC' : 'rgba(255, 255, 255, 0.15)'}`,
      }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Wrapper;
