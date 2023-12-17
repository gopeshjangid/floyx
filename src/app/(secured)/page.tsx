'use client';

import FollowNewAccounts from '@/components/AccountFollowBox';
import NewRegisteredUsers from '@/components/FriendsActivity';
import RecentArticles from '@/components/PopularToday';
import AddPost from '@/components/Post/AddPost';
import PostList from '@/components/Post/PostList';
import PostHeader from '@/components/PostHeader';
import { useGetPostsQuery } from '@/lib/redux';

import { Box, Grid, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

export interface apiParams {
  pageNumber: number;
  postCreatedDate: number;
}

export default function Page() {
  const [apiParams, setApiParams] = useState<apiParams>({
    pageNumber: 0,
    postCreatedDate: 0,
  });

  const isMobile = useMediaQuery('(max-width:480px)');
  const { data: postData, isFetching } = useGetPostsQuery(apiParams);

  const loadMore = (e: any, pageNumber: number, isFetching: boolean) => {
    console.log('load more...');
    if (postData) {
      const lastPost = postData[postData.length - 1];
      if (e > pageNumber && lastPost !== undefined && !isFetching) {
        setApiParams({
          pageNumber: e,
          postCreatedDate: lastPost?.post?.createdDateTime,
        });
      }
    }
  };

  useEffect(() => {
    console.log('postData', postData, postData === undefined, postData?.length % 10 === 0);
  }, [postData]);
  const viewportHeight = window.innerHeight;
  return (
    <Box p={isMobile ? 2 : 2} mt={2}>
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
            <PostHeader />
            <AddPost />
            <FollowNewAccounts />
            <PostList
              postData={postData || []}
              loadMore={loadMore}
              apiParams={apiParams}
              isFetching={isFetching}
              hasMore={ postData === undefined || postData?.length % 10 === 0}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={3} paddingRight={1}>
          <RecentArticles />
          <NewRegisteredUsers />
        </Grid>
      </Grid>
    </Box>
  );
}
