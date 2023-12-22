'use client';
import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';

export default function ArticleCardSkeleton(props: { repeats?: number }) {
  const { palette } = useTheme();
  const { repeats = 1 } = props;
  const repeatsCount = Array.from({ length: repeats }, (_, index) => index);
  return (
    <Box py={2}>
      {repeatsCount.map(skeleton => (
        <Grid
          container
          sx={{
            background: palette.primary.mainBackground,
            borderRadius: '5px',
          }}
          key={'skeelton-' + skeleton}
          spacing={1}
          my={1}
          p={1}
        >
          <Grid item xs={12} sm={3}>
            <Skeleton variant="rounded" height={150} />
          </Grid>
          <Grid item xs={12} sm={9}>
            <Stack gap={2}>
              <Skeleton variant="text" width={'100%'} height={'40px'} />
              <Skeleton variant="text" width={'100%'} height={'40px'} />
              <Stack direction="row" gap={1}>
                <Skeleton variant="circular" width={'40px'} height={40} />
                <Skeleton variant="rounded" width={'60%'} height={40} />
                <Skeleton variant="rounded" width={'33%'} height={40} />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}
