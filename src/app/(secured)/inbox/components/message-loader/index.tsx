import React from 'react';
import { Box, Skeleton } from '@mui/material';

const MessageLoader = () => {
  return (
    <Box
      sx={{
        padding: '0px 20px',
      }}
    >
      {Array.from(new Array(7)).map((_, index) => (
        <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Skeleton variant="circular" height={59} width={59} />
          <Skeleton variant="text" height={90} width="80%" />
        </Box>
      ))}
    </Box>
  );
};

export default MessageLoader;
