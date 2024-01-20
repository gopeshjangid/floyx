'use client';
import { Box, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostBox } from './styledPostBox';
import Post from './Post';
import { PostDetailResult } from '@/lib/redux/slices/posts';
import React from 'react';

interface PostProps {
  postData: PostDetailResult[];
  loadMore: any;
  hasMore: boolean;
}

const LoaderSkeleton = () => {
  const { palette } = useTheme();
  return (
    <Box sx={{ background: palette.primary.mainBackground }} p={1}>
      <Stack my={2} gap={1}>
        <Stack direction="row" gap={1}>
          <Skeleton variant="circular" width={'60px'} height={'30px'} />
          <Skeleton variant="text" width={'100%'} height={30} />
          <Skeleton variant="text" width={'100%'} height={30} />
        </Stack>
        <Skeleton variant="rectangular" width={'100%'} height={100} />
        <Skeleton variant="text" width={'100%'} height={100} />
        <Skeleton variant="rectangular" width={'100%'} height={30} />
      </Stack>
    </Box>
  );
};

function PostList({ postData, loadMore, hasMore }: PostProps) {
  const { palette } = useTheme();
  return (
    <>
      {Array.isArray(postData) && postData?.length ? (
        <Box>
          <InfiniteScroll
            dataLength={postData.length} //This is important field to render the next data
            next={loadMore}
            hasMore={hasMore}
            loader={<LoaderSkeleton key="loader-ininfite" />}
            endMessage={
              <Box
                sx={{
                  border: `1px solid ${palette.primary.boxBorder}`,
                  borderRadius: '10px',
                  background: palette.primary.mainBackground,
                }}
                p={1}
                mt={1}
              >
                <Typography textAlign="center" variant="subtitle1" color="info">
                  Yay! You have seen it all
                </Typography>
              </Box>
            }
          >
            {postData?.map((val: any) => (
              <Post
                key={`post-${val?.id}-post-created-time-${val.post?.createdDateTime}`}
                name={val?.author?.name || ''}
                username={val?.author?.username || ''}
                createdDateTime={val?.post?.createdDateTime}
                content={val?.post?.content}
                shared={val?.post?.shared}
                image={val?.post?.image}
                link={val?.post?.link}
                postDetails={val?.post}
                postId={val?.id}
              />
            ))}
          </InfiniteScroll>
        </Box>
      ) : (
        <PostBox>
          <Box sx={{ margin: '0rem 1rem 1rem' }}>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                margin: '10px',
                padding: '20px 0px',
              }}
            >
              <Box>
                <Skeleton
                  variant="circular"
                  sx={{ width: 50, height: 50, marginRight: '10px' }}
                  animation="wave"
                />
              </Box>
              <Box>
                <Box>
                  <Skeleton variant="text" height={25} animation="wave" />
                </Box>
                <Box>
                  <Skeleton
                    variant="text"
                    height={25}
                    width={200}
                    animation="wave"
                  />
                </Box>
              </Box>
            </Box>
            <Box>
              <Skeleton variant="rounded" height={300} animation="wave" />
            </Box>
            <Skeleton variant="text" height={30} animation="wave" />{' '}
          </Box>
        </PostBox>
      )}
    </>
  );
}

export default React.memo(PostList);
