'use client';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import CustomChip from '../CustomGridientChip';

export default function RecommendedTopics({ tags }: { tags: string[] }) {
  const { palette } = useTheme();

  return (
    <Box sx={{ marginTop: '30px', width: '100%' }}>
      <Typography
        color={palette.mode === 'light' ? 'primary' : 'textPrimary'}
        variant="h5"
      >
        Hot Topics
      </Typography>
      <Box sx={{ marginTop: '20px' }}>
        <Grid container>
          {tags.map((val, index) => (
            <CustomChip
              key={'topics' + index}
              label={val}
              component="a"
              href={'/article/' + val}
              clickable
              style={{ marginBottom: 10, marginRight: 10 }}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
