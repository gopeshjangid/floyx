'use client';

import FriendsActivity from '@/components/FriendsActivity';
import PopularToday from '@/components/PopularToday';
import AddPost from '@/components/Post/AddPost';
import PostList from '@/components/Post/PostList';
import PostHeader from '@/components/PostHeader';
import { useGetPostListByUserQuery, useGetPostsQuery } from '@/lib/redux';

import { Box, Grid, useMediaQuery } from '@mui/material';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface apiParams {
  pageNumber: number;
  postCreatedDate: number;
}

export default function ProfilePostList() {
  const params = useParams();
  const [apiParams, setApiParams] = useState<apiParams>({
    pageNumber: 0,
    postCreatedDate: 0,
    username: params?.username ?? '',
  });

  const isMobile = useMediaQuery('(max-width:480px)');
  const { data: postData, isFetching } = useGetPostListByUserQuery(apiParams);

  const loadMore = (e: any, pageNumber: number, isFetching: boolean) => {
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
    console.log('postData', postData);
  }, [postData]);

  return (
    <Box p={isMobile ? 2 : 0}>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={9} marginTop={2} marginBottom={2}>
          <PostHeader />
          <AddPost />
          <PostList
            postData={postData || []}
            loadMore={loadMore}
            apiParams={apiParams}
            isFetching={isFetching}
          />
        </Grid>
        <Grid item xs={12} sm={3} paddingRight={1}>
          <PopularToday />
          <FriendsActivity />
        </Grid>
      </Grid>
    </Box>
  );
}
