'use client';
import { useGetArticleListQuery } from '@/lib/redux';
import {
  Box,
  Typography,
  Divider,
  Skeleton,
  Stack,
  Alert,
} from '@mui/material';

import { styled, useTheme } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';

const PopularTodaySection = styled(Box)(() => ({
  alignItems: 'center',
  marginTop: '1rem',
}));

const PopularTodayListSection = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.boxBorder}`,
  backgroundColor: theme.palette.primary.mainBackground,
  borderRadius: '10px',
  marginTop: '25px',
  maxHeight: '100vh',
  overflowY: 'auto',
  '& .box': {
    marginTop: '10px',
    '& .boxdata': {
      display: 'flex',
    },
  },
}));

function RecentArticles() {
  const { palette } = useTheme();
  const { data, isLoading, isError } = useGetArticleListQuery(
    'recent?forHome=true'
  );

  return (
    <PopularTodaySection>
      <Typography variant="body1">Recent Articles</Typography>
      {isError && (
        <Alert severity="error" color="error">
          Error in loading recent articles.
        </Alert>
      )}
      <PopularTodayListSection>
        {!isLoading && data ? (
          data.map((article, index) => (
            <Box p={2} key={`recent-article-${index}`}>
              <Link target="__blank" href={article.article.publicUrl ?? '/'}>
                <Stack py={1} direction="row" gap={2}>
                  <Box>
                    <Image
                      alt={article.article.title ?? 'article title'}
                      src={article.article?.coverPhotoThumbnail}
                      height={70}
                      width={80}
                      style={{ borderRadius: '3px' }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{
                        wordBreak: 'break-all',
                        color: palette.primary.fontLightColor,
                      }}
                      variant="body2"
                      gutterBottom={false}
                    >
                      {article.article.title ?? '(No title)'}...
                    </Typography>
                    <Typography color="textPrimary" variant="caption">
                      {article.article.title?.slice(0, 30)}...
                    </Typography>
                  </Box>
                </Stack>
              </Link>
              <Divider />
            </Box>
          ))
        ) : (
          <>
            <Box p={2} display="flex" flexDirection={'column'} gap={2}>
              {[1, 2, 3].map(index => (
                <>
                  <Stack
                    alignItems={'center'}
                    gap={2}
                    direction="row"
                    key={'item- article-' + index}
                  >
                    <Skeleton
                      variant="rounded"
                      height={60}
                      width={'35%'}
                      animation="wave"
                    />
                    <Stack width={'65%'}>
                      <Skeleton
                        variant="text"
                        height={35}
                        width={'100%'}
                        animation="wave"
                      />
                      <Skeleton
                        variant="text"
                        height={35}
                        width={'100%'}
                        animation="wave"
                      />
                    </Stack>
                  </Stack>
                  <Divider />
                </>
              ))}
            </Box>
          </>
        )}
      </PopularTodayListSection>
    </PopularTodaySection>
  );
}

export default RecentArticles;
