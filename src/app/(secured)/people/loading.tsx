import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Variants() {
  return (
    <Stack spacing={1} gap={2} mt={5} sx={{ width: '100%' }}>
      <Skeleton variant="rectangular" width={'100%'} height={60} />
      <Skeleton variant="rectangular" width={'100%'} height={60} />
      <Skeleton variant="rectangular" width={'100%'} height={60} />
      <Skeleton variant="rectangular" width={'100%'} height={60} />
      <Skeleton variant="rectangular" width={'100%'} height={60} />
    </Stack>
  );
}
