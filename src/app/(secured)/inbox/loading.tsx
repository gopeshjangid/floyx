import React from 'react';
import { Box, Skeleton } from '@mui/material';

const MessageLoader = () => {
  return (
    <Box>
      <Skeleton variant="rectangular" animation="wave" height={70} />
      {Array.from(new Array(8)).map((_, index) => (
        <Skeleton animation="wave" key={index} height={90} />
      ))}
    </Box>
  );
};

export default MessageLoader;
