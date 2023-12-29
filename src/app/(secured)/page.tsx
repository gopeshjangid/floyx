'use client';

import FollowNewAccounts from '@/components/AccountFollowBox';
import NewRegisteredUsers from '@/components/FriendsActivity';
import RecentArticles from '@/components/PopularToday';
import AddPost from '@/components/Post/AddPost';
import PostList from '@/components/Post/PostList';
import PostHeader from '@/components/PostHeader';
import { useGetPostsQuery, usePollLatestPostQuery } from '@/lib/redux';

import { Box, Grid, Skeleton, useMediaQuery } from '@mui/material';
import { Suspense, useCallback, useEffect, useState } from 'react';

export interface apiParams {
  pageNumber: number;
  postCreatedDate: number;
}

const SectionSkeleton = () => (
  <Skeleton variant="rectangular" width="100%" height="200px" />
);

export default function Page() {
  const [apiParams, setApiParams] = useState<apiParams>({
    pageNumber: 0,
    postCreatedDate: 0,
  });

  const isMobile = useMediaQuery('(max-width:480px)');
  const { data, isFetching } = useGetPostsQuery(apiParams);
  const postData = data?.postList;
  const hasMore = typeof data?.hasMore != 'undefined' ? data?.hasMore : true;

  //const [latestPostDateTime, setLatestPostDateTime] = useState(Date.now());
  // const { data: latestPosts, refetch } = usePollLatestPostQuery(
  //   { postCreatedDate: latestPostDateTime },
  //   {
  //     pollingInterval: 60000, // Poll every 60 seconds
  //     //skip: false, // Replace with your logic to determine if the screen is focused
  //   }
  // );

  // // Logic to update latestPostDateTime based on the latest post received
  // useEffect(() => {
  //   if (latestPosts?.length) {
  //     setLatestPostDateTime(
  //       latestPosts[latestPosts.length - 1].post.createdDateTime
  //     );
  //   }
  // }, [latestPosts]);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: any;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const loadMore = useCallback(
    debounce(() => {
      if (postData?.length && !isFetching) {
        const lastPost = postData[postData.length - 1];
        setApiParams(prevParams => ({
          ...prevParams,
          pageNumber: prevParams.pageNumber + 1,
          postCreatedDate: lastPost?.post?.createdDateTime,
        }));
      }
    }, 2000),
    [postData, isFetching, setApiParams]
  );

  const viewportHeight =
    typeof window === 'undefined' ? 1000 : window.innerHeight;

  return (
    <Box p={isMobile ? 2 : 4} mt={2}>
      <Grid container columnSpacing={{ xs: 1, sm: 3, md: 3 }}>
        <Grid item xs={12} sm={9} marginTop={2} marginBottom={2}>
          <Box
            sx={{
              overflow: 'auto',
              maxHeight: viewportHeight,
              overflowY: 'auto',
              scrollbarWidth: 'none', // For Firefox
              msOverflowStyle: 'none', // For IE 10+
              '&::-webkit-scrollbar': {
                display: 'none', // For Chrome, Safari, and newer versions of Edge
              },
            }}
          >
            <Suspense fallback={<SectionSkeleton />}>
              <PostHeader />
            </Suspense>
            <AddPost />
            <Suspense fallback={<SectionSkeleton />}>
              <FollowNewAccounts />
            </Suspense>
            <PostList
              postData={postData || []}
              loadMore={loadMore}
              hasMore={hasMore}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} paddingRight={1}>
          <Suspense fallback={<SectionSkeleton />}>
            <RecentArticles />
          </Suspense>
          <Suspense fallback={<SectionSkeleton />}>
            <NewRegisteredUsers />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  );
}
