import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box, Grid } from '@mui/material';

export default function HomePageLoading() {
  return (
    <Box mt={4} p={1}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={9}>
          <Skeleton variant="rectangular" width={'100%'} height={180} />
          <Stack spacing={2} my={2}>
            <Stack direction="row" gap={1}>
              <Skeleton variant="circular" width={'40px'} height={40} />
              <Skeleton variant="text" width={'100%'} height={30} />
            </Stack>
            <Skeleton variant="rectangular" width={'100%'} height={160} />
            <Skeleton variant="rectangular" width={'100%'} height={160} />
          </Stack>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Stack spacing={2}>
            <Skeleton variant="text" width={'100%'} height={30} />
            <Skeleton variant="text" width={'100%'} height={30} />
            <Skeleton variant="text" width={'100%'} height={30} />
            <Skeleton variant="text" width={'100%'} height={30} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
