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

import { styled } from '@mui/material/styles';
import Image from 'next/image';
import Link from 'next/link';
import CustomDescription from '../customDescription';
import { useRouter } from 'next/navigation';

const PopularTodaySection = styled(Box)(() => ({
  alignItems: 'center',
}));

const PopularTodayListSection = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.boxBorder}`,
  backgroundColor: theme.palette.primary.mainBackground,
  borderRadius: '10px',
  maxHeight: '110vh',
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
  const { data, isLoading } = useGetArticleListQuery('recent?forHome=true',{refetchOnMountOrArgChange: false});
console.log("recent article: ", {data, isLoading});
  return (
    <PopularTodaySection>
      <Box textAlign={'center'} marginTop="-10px">
        <Typography variant="body1">Recent Articles</Typography>
      </Box>
      <PopularTodayListSection mt={2}>
        {!isLoading && data ? (
          data.map((article, index) => (
            <Box p={1} pb={2} key={`recent-article-${index}`}>
              <Link
                //target="_blank"
                style={{cursor: !article.article.publicUrl ? 'not-allowed' : 'pointer'}}
                href={
                  article.article.publicUrl
                    ? '/article/' +
                      article.user.username +
                      '/' +
                      article.article.publicUrl
                    : ''
                }
              >
                <Stack gap={0.8} pb={0.5}>
                  <Box position={'relative'} width={'100%'} height={120}>
                    <Image
                      alt={article.article.title ?? 'article title'}
                      src={article.article?.coverPhotoThumbnail}
                      fill
                      objectFit="cover"
                      objectPosition="center"
                      style={{ borderRadius: '5px' }}
                    />
                  </Box>
                  <Stack gap={0}>
                    <CustomDescription variant="subtitle2" gutterBottom={false}>
                      {article.article.title.slice(0, 50) ?? '(No title)'}...
                    </CustomDescription>
                  </Stack>
                </Stack>
              </Link>
              {data.length - 1 !== index && <Divider />}
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
                        height={45}
                        width={'100%'}
                        animation="wave"
                      />
                      <Skeleton
                        variant="text"
                        height={25}
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
      <Box width="100%" textAlign={'center'} mt={1} mb={1}>
        <Button
          onClick={() => router.push('/articles')}
          variant="text"
          size="small"
          sx={{ fontSize: '.65rem' }}
        >
          show more
        </Button>
      </Box>
    </PopularTodaySection>
  );
}

export default RecentArticles;
