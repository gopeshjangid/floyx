'use client';
import { Box, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import InfiniteScroll from 'react-infinite-scroll-component';
import { PostBox } from './styledPostBox';
import Post from './Post';
import { PostDetailResult } from '@/lib/redux/slices/posts';
import React from 'react';
import CustomDescription from '../customDescription';
import { useTranslation } from 'react-i18next';

interface PostProps {
  postData: PostDetailResult[];
  loadMore: any;
  hasMore: boolean;
  scrollThreshold?: number;
  showComments?: boolean;
  isLoading?: boolean;
  mainContainerFeedRef?:any
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

function PostList({
  postData,
  showComments,
  loadMore,
  hasMore,
  scrollThreshold,
  isLoading,
  mainContainerFeedRef
}: PostProps) {
  const { palette } = useTheme();
const {t}=useTranslation()
  return (
    <>
      {!isLoading && Array.isArray(postData) ? (
        <Box>
          {postData?.length > 0 ? (
            <InfiniteScroll
              dataLength={postData.length} //This is important field to render the next data
              next={loadMore}
              hasMore={hasMore}
              scrollThreshold={scrollThreshold}
              loader={<LoaderSkeleton key="loader-ininfite" />}
              scrollableTarget={mainContainerFeedRef.current}
              endMessage={
                <Box
                  translate="no"
                  sx={{
                    border: `1px solid ${palette.primary.boxBorder}`,
                    borderRadius: '10px',
                    background: palette.primary.mainBackground,
                  }}
                  p={1}
                  mt={1}
                >
                  <Typography
                    translate="no"
                    textAlign="center"
                    variant="subtitle1"
                    color="info"
                  >
                    {t('Home.postSection.seenAll')}
                  </Typography>
                </Box>
              }
            >
              {postData?.map((val: any, index) => (
                <React.Fragment key={`post-item-list-${index}`}>
                  {val?.author?.username && (
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
                      showComments={showComments}
                    />
                  )}
                </React.Fragment>
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
                  <CustomDescription translate="no" variant="subtitle1">
                    {t('Home.postSection.noPost')}
                  </CustomDescription>
                </Box>
              </Box>
            </PostBox>
          )}
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
