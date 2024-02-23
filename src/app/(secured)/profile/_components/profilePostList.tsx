'use client';
import PostList from '@/components/Post/PostList';
import { useGetPostListByUserQuery } from '@/lib/redux';
import { Box, Grid } from '@mui/material';
import { useParams } from 'next/navigation';
import React, { useState, useCallback, useEffect } from 'react';

export interface apiParams {
  pageNumber: number;
  postCreatedDate: number | '';
  username: string;
}

function ProfilePostList({parentRef}) {
  const params = useParams();
  const username = Array.isArray(params?.username)
    ? params?.username[0]
    : params?.username || '';
  const [apiParams, setApiParams] = useState<apiParams>({
    pageNumber: 1,
    postCreatedDate: '',
    username: username || '',
  });

  useEffect(()=>{
   if(username){
    setApiParams((params)=>({...params, username, pageNumber : 1}))
   }
  },[username])

  const { data, isFetching, isLoading } = useGetPostListByUserQuery(apiParams);
  const postData = data?.postList;
  const hasMore = typeof data?.hasMore != 'undefined' ? data?.hasMore : true;
  const loadMore = useCallback(() => {
    if (postData?.length && !isFetching) {
      const lastPost = postData[postData.length - 1];
      setApiParams(prevParams => ({
        ...prevParams,
        pageNumber: prevParams.pageNumber + 1,
        postCreatedDate: lastPost?.post?.createdDateTime,
      }));
    }
  }, [postData, isFetching, setApiParams]);

  return (
    <Box>
      <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} sm={12} marginTop={2} marginBottom={2}>
          <PostList
            postData={postData || []}
            loadMore={loadMore}
            hasMore={hasMore}
            scrollThreshold={0.7}
            isLoading={isLoading}
            mainContainerFeedRef={parentRef}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default React.memo(ProfilePostList);
