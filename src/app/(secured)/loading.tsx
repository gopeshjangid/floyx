import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function Variants() {
  return (
    <Stack spacing={2}>
      <Skeleton variant="rectangular" width={'100%'} height={260} />\
      <Skeleton variant="rectangular" width={'100%'} height={260} />
      <Skeleton variant="rounded" width={'100%'} height={160} />
      <Skeleton variant="rounded" width={'100%'} height={160} />
    </Stack>
  );
}
