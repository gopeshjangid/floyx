import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import { Box, Grid } from '@mui/material';

export default function DefaultPageSkelton({
  showOnlyContent,
}: {
  showOnlyContent?: boolean;
}) {
  return (
    <Box mt={4} p={1}>
      <Grid container spacing={2}>
        {!showOnlyContent && (
          <Grid item xs={12} sm={3} gap={1}>
            <Stack gap={1}>
              <Skeleton variant="text" width={'100%'} height={30} />
              <Skeleton variant="text" width={'100%'} height={30} />
              <Skeleton variant="text" width={'100%'} height={30} />
              <Skeleton variant="text" width={'100%'} height={30} />
              <Skeleton variant="text" width={'100%'} height={30} />
              <Skeleton variant="text" width={'100%'} height={30} />
            </Stack>
          </Grid>
        )}
        <Grid item xs={12} sm={showOnlyContent ? 12 : 6} gap={1}>
          <Stack spacing={2} my={2}>
            <Stack direction="row" gap={1}>
              <Skeleton variant="circular" width={'40px'} height={40} />
              <Skeleton variant="text" width={'100%'} height={30} />
            </Stack>
            <Skeleton variant="rectangular" width={'100%'} height={160} />
            <Skeleton variant="rectangular" width={'100%'} height={160} />
          </Stack>
          <Stack spacing={2} my={2}>
            <Stack direction="row" gap={1}>
              <Skeleton variant="circular" width={'40px'} height={40} />
              <Skeleton variant="text" width={'100%'} height={30} />
            </Stack>
            <Skeleton variant="rectangular" width={'100%'} height={160} />
            <Skeleton variant="rectangular" width={'100%'} height={160} />
          </Stack>
        </Grid>
        {!showOnlyContent && (
          <Grid item xs={12} sm={showOnlyContent ? 4 : 3}>
            <Stack spacing={2}>
              <Skeleton variant="text" width={'100%'} height={30} />
              <Skeleton variant="text" width={'100%'} height={30} />
              <Skeleton variant="text" width={'100%'} height={30} />
              <Skeleton variant="text" width={'100%'} height={30} />
            </Stack>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}
