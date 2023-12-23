import { Skeleton, Stack, Box } from '@mui/material';
import React from 'react';
function Loading() {
  return (
    <Stack gap={1} direction="row">
      <Stack spacing={2} my={2}>
        <Stack direction="row" gap={1}>
          <Skeleton variant="circular" width={'40px'} height={40} />
          <Skeleton variant="text" width={'100%'} height={30} />
        </Stack>
        <Skeleton variant="rectangular" width={'100%'} height={160} />
        <Skeleton variant="rectangular" width={'100%'} height={160} />
      </Stack>
      <Box my={2}>
        <Skeleton variant="rectangular" width={'100%'} height={160} />
      </Box>
      <Stack spacing={2} my={2} gap={1}>
        <Skeleton variant="rectangular" width={'100%'} height={160} />
        <Skeleton variant="rectangular" width={'100%'} height={160} />
      </Stack>
    </Stack>
  );
}

// In a server component or loader function

export const loader = ({ request }) => {
  const deviceType = request.cookies.get('deviceType');
  console.log({ deviceType });
  // ... rest of the loader logic
};

export default Loading;
