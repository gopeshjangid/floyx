import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Loading() {
  return (
    <Stack spacing={1} mt={3} pt={2}>
      <Skeleton
        animation="wave"
        variant="rounded"
        width={'100%'}
        height={100}
      />
      <Skeleton animation="wave" variant="circular" width={40} height={40} />
      <Stack direction={'row'} spacing={2}>
        <Skeleton animation="wave" variant="text" width={'100%'} />
        <Skeleton animation="wave" variant="text" width={'100%'} />
      </Stack>
      <Skeleton animation="wave" variant="rounded" width={'100%'} height={80} />
      <Stack direction={'row'} spacing={2}>
        <Skeleton animation="wave" variant="text" />
        <Skeleton animation="wave" variant="text" />
        <Skeleton animation="wave" variant="text" />
      </Stack>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width={'100%'}
        height={160}
      />
    </Stack>
  );
}
