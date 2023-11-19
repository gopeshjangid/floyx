import React from 'react';
import { Box, Skeleton } from '@mui/material';

const MessageLoading = () => {
  return (
    <Box>
      <Skeleton variant="rectangular" height={70} />
      {Array.from(new Array(8)).map((_, index) => (
        <Skeleton key={index} height={90} />
      ))}
    </Box>
  );
};

export default MessageLoading;
