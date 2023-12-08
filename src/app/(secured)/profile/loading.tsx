import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Loading() {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rounded" width={'100%'} height={100} />
      <Skeleton variant="circular" width={40} height={40} />
      <Stack direction={'row'} spacing={2}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Stack>
      <Skeleton variant="rounded" width={'100%'} height={80} />
      <Stack direction={'row'} spacing={2}>
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
      </Stack>
      <Skeleton variant="rectangular" width={'100%'} height={160} />
    </Stack>
  );
}
