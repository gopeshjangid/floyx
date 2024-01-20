'use client';
import { useGetArticleListQuery } from '@/lib/redux';
import {
  Box,
  Typography,
  Divider,
  Skeleton,
  Stack,
  Button,
} from '@mui/material';

import { styled, useTheme } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CustomDescription from '../customDescription';

const PopularTodaySection = styled(Box)(() => ({
  alignItems: 'center',
}));

const PopularTodayListSection = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.boxBorder}`,
  backgroundColor: theme.palette.primary.mainBackground,
  borderRadius: '10px',
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
  const router = useRouter();
  const { data, isLoading, isError } = useGetArticleListQuery(
    'recent?forHome=true'
  );

  return (
    <PopularTodaySection>
      <Box display={{ xs: 'block', sm: 'none' }}>
        <Typography variant="body1">Recent Articles</Typography>
      </Box>
      <PopularTodayListSection mt={4}>
        {!isLoading && data ? (
          data.map((article, index) => (
            <Box p={1} py={2} key={`recent-article-${index}`}>
              <Link
                target="_blank"
                href={
                  article.article.publicUrl
                    ? '/article/' +
                      article.user.username +
                      '/' +
                      article.article.publicUrl
                    : '/'
                }
              >
                <Stack gap={0.8} pb={0.5}>
                  <Box position={'relative'} width={'100%'}>
                    <Image
                      alt={article.article.title ?? 'article title'}
                      src={article.article?.coverPhotoThumbnail}
                      height="160"
                      width="200"
                      style={{ borderRadius: '5px' }}
                    />
                  </Box>
                  <Stack gap={0}>
                    <CustomDescription variant="subtitle2" gutterBottom={false}>
                      {article.article.title.slice(0, 100) ?? '(No title)'}...
                    </CustomDescription>
                    <Button
                      variant="text"
                      size="small"
                      sx={{ fontSize: '.65rem' }}
                    >
                      show more
                    </Button>
                  </Stack>
                </Stack>
              </Link>
              <Divider />
            </Box>
          ))
        ) : (
          <>
            <Box p={2} display="flex" flexDirection={'column'} gap={2}>
              {[1, 2, 3].map(index => (
                <Box key={`skelton-${index}`}>
                  <Stack
                    alignItems={'center'}
                    gap={2}
                    direction="row"
                    key={'item- article-' + index}
                  >
                    <Skeleton
                      variant="rounded"
                      height={100}
                      width={'100%'}
                      animation="wave"
                    />
                    <Stack width={'100%'}>
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
                </Box>
              ))}
            </Box>
          </>
        )}
      </PopularTodayListSection>
    </PopularTodaySection>
  );
}

export default RecentArticles;
