'use client';
import { Box, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import CustomChip from '../CustomGridientChip';
import { useGetPopularTagsQuery } from '@/lib/redux/slices/tags';
import Link from 'next/link';

export default function RecommendedTopics({ setDynamicTab }) {
  const { palette } = useTheme();
  const { data: hotTopics, isLoading } = useGetPopularTagsQuery();
  const handleClick = val => {
    setDynamicTab({
      searchBy: 'tag',
      tagId: val.tagName,
      value: val.tagName,
    });
  };
  return (
    <Box sx={{ marginTop: '30px', width: '100%' }}>
      <Typography
        color={palette.mode === 'light' ? 'primary' : 'textPrimary'}
        variant="h5"
      >
        Hot Topics
      </Typography>
      <Stack
        flexWrap="wrap"
        my={2}
        direction="row"
        justifyContent="flex-start"
        rowGap={1}
      >
        {isLoading && (
          <Skeleton variant="rectangular" width="100%" height="100px" />
        )}
        {!isLoading &&
          hotTopics &&
          hotTopics.map((val, index) => (
            <CustomChip
              key={'topics' + index}
              label={val?.tagName}
              component={Link}
              href={`/articles/#${val.tagName}`}
              clickable
              style={{ marginBottom: 10, marginRight: 10 }}
              onClick={() => handleClick(val)}
            />
          ))}
      </Stack>
    </Box>
  );
}
