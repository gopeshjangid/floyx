'use client';
import { useGetArticleListQuery } from '@/lib/redux';
import { Box, Typography, Divider, Skeleton, Stack } from '@mui/material';

import { styled } from '@mui/material/styles';
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
  maxHeight: '35vh',
  overflowY: 'auto',
  '& .box': {
    marginTop: '10px',
    '& .boxdata': {
      display: 'flex',
    },
  },
}));

function RecentArticles() {
  const { data, isLoading, isError } = useGetArticleListQuery(
    'recent?forHome=true'
  );

  return (
    <PopularTodaySection>
      <Typography variant="body1">Recent Articles</Typography>
      {isError && (
        <Typography variant="body1" color="error">
          Something went wrong!
        </Typography>
      )}
      <PopularTodayListSection>
        {!isLoading && data ? (
          data.map((article, index) => (
            <Box p={2} key={`popularToday${index}`}>
              <Link target="__blank" href={article.article.publicUrl}>
                <Stack py={1} direction="row" gap={2}>
                  <Box>
                    <Image
                      alt={article.article.title}
                      src={article.article?.coverPhotoThumbnail}
                      height={70}
                      width={80}
                      style={{ borderRadius: '3px' }}
                    />
                  </Box>
                  <Box>
                    <Typography
                      sx={{ wordBreak: 'break-all' }}
                      variant="body2"
                      gutterBottom={false}
                    >
                      {article.article.title}...
                    </Typography>
                    <Typography sx={{ opacity: 0.6 }} variant="caption">
                      {article.article.title?.slice(0, 20)}...
                    </Typography>
                  </Box>
                </Stack>
              </Link>
              <Divider />
            </Box>
          ))
        ) : (
          <>
            <Box p={2} className="box">
              <Skeleton
                variant="text"
                height={35}
                width={'70%'}
                animation="wave"
              />
              <Skeleton
                variant="text"
                height={30}
                width={'50%'}
                animation="wave"
              />
              <Divider />
            </Box>
            <Box p={2} className="box">
              <Skeleton
                variant="text"
                height={35}
                width={'70%'}
                animation="wave"
              />
              <Skeleton
                variant="text"
                height={30}
                width={'50%'}
                animation="wave"
              />
              <Divider />
            </Box>
            <Box p={2} className="box">
              <Skeleton
                variant="text"
                height={35}
                width={'70%'}
                animation="wave"
              />
              <Skeleton
                variant="text"
                height={30}
                width={'50%'}
                animation="wave"
              />
            </Box>
          </>
        )}
      </PopularTodayListSection>
    </PopularTodaySection>
  );
}

export default RecentArticles;
