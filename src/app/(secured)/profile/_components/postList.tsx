'use client';
import PostList from '@/components/Post/PostList';
import { useGetPostListByUserQuery } from '@/lib/redux';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export interface apiParams {
  pageNumber: number;
  postCreatedDate: number;
  username: string;
}

function ProfilePostList() {
  const params = useParams();

  const [apiParams, setApiParams] = useState<apiParams>({
    pageNumber: 0,
    postCreatedDate: 0,
    username: (params.username as any) ?? '',
  });

  const isMobile = useMediaQuery('(max-width:480px)');
  const { data: postData, isFetching } = useGetPostListByUserQuery(apiParams);

  const loadMore = (e: any, pageNumber: number, isFetching: boolean) => {
    if (postData) {
      const lastPost = postData[postData.length - 1];
      if (e > pageNumber && lastPost !== undefined && !isFetching) {
        setApiParams({
          ...apiParams,
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
        <Grid item xs={12} sm={12} marginTop={2} marginBottom={2}>
          <PostList
            postData={postData || []}
            loadMore={loadMore}
            apiParams={apiParams}
            isFetching={isFetching}
            hasMore={postData ? postData.length === 10 : false}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default React.memo(ProfilePostList);
