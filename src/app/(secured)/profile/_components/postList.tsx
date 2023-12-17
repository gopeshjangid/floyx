'use client';
import PostList from '@/components/Post/PostList';
import { useGetPostListByUserQuery } from '@/lib/redux';
import { Box, Grid, useMediaQuery } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useState, useCallback } from 'react';

export interface apiParams {
  pageNumber: number;
  postCreatedDate: number;
  username: string;
}

function ProfilePostList() {
  const params = useParams();
  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username;
  const [apiParams, setApiParams] = useState<apiParams>({
    pageNumber: 0,
    postCreatedDate: 0,
    username: username || '',
  });

  const isMobile = useMediaQuery('(max-width:480px)');
  const { data: postData, isFetching } = useGetPostListByUserQuery(apiParams);

  // Custom debounce function
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
    debounce((pageNumber: number) => {
      if (postData && postData.length && !isFetching) {
        const lastPost = postData[postData.length - 1];
        if (pageNumber > apiParams.pageNumber && lastPost) {
          setApiParams(prevParams => ({
            ...prevParams,
            pageNumber: pageNumber,
            postCreatedDate: lastPost?.post?.createdDateTime,
          }));
        }
      }
    }, 1000),
    [postData, isFetching, apiParams.pageNumber]
  );

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
