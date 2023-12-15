'use client';
import InfiniteScroll from 'react-infinite-scroller';
import { Box, Skeleton, Stack } from '@mui/material';

import { PostBox } from './styledPostBox';
import Post from './Post';
import { PostDetailResult } from '@/lib/redux/slices/posts';
import { apiParams } from '@/app/(secured)/page';

interface PostProps {
  postData: PostDetailResult[];
  loadMore: any;
  apiParams: apiParams;
  isFetching: boolean;
  hasMore: boolean;
}

const LoaderSkeleton = () => (
  <Box bgcolor="Background.paper" p={1}>
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

export default function PostList({
  postData,
  loadMore,
  apiParams,
  isFetching,
  hasMore,
}: PostProps) {
  return (
    <>
      {Array.isArray(postData) && postData?.length ? (
        <InfiniteScroll
          pageStart={0}
          loadMore={(e: any) => loadMore(e, apiParams?.pageNumber, isFetching)}
          hasMore={hasMore}
          useWindow={false}
          threshold={100}
          loader={<LoaderSkeleton key="loader-ininfite" />}
        >
          {postData?.map((val: any) => (
            <Post
              key={`posts${val?.id}`}
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
