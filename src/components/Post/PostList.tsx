'use client';
import { useEffect, useState } from 'react';
import * as InfiniteScroll from 'react-infinite-scroller'
import { Box, CircularProgress, Skeleton } from '@mui/material';

import { PostBox } from './styledPostBox';
import Post from './Post';
import { useGetPostsQuery } from "@/lib/redux/slices/posts";

interface postObj {
  id: string;
  author: any;
  post: {
    id: string;
    content: string;
    link: {
      thumbnailPath: string;
    };
  };
}

export default function PostList() {
  const [apiParams, setApiParams] = useState<{
    pageNumber: number;
    postCreatedDate: number;
  }>({
    pageNumber: 0,
    postCreatedDate: 0,
  });
  const [apiHit, setApiHit] = useState(false);
  const [postCreatedDate, setPostCreatedDate] = useState<number>(0);
  const { data: postData, isLoading, isFetching, isError, ...props } = useGetPostsQuery(apiParams?.pageNumber);

  const loadMore = (e, pageNumber, isFetching, apiHit) => {
    // console.log(isFetching, 'afdsdfsdfasfd')
    const lastPost = postData[postData.length - 1];
    console.log(e, pageNumber, isFetching, e > pageNumber , lastPost !== undefined , !isFetching , !apiHit);
    
    if (e > pageNumber && lastPost !== undefined && !isFetching && !apiHit) {
      console.log('ddddd')
      setApiHit(true);
      setApiParams({
        pageNumber: e,
        postCreatedDate: lastPost?.post?.createdDateTime,
      });
    }
  }


  return (
    <>
      {(Array.isArray(postData) && postData?.length) ? (
          <InfiniteScroll
            pageStart={0}
            loadMore={(e) => loadMore(e, apiParams?.pageNumber, isFetching, apiHit)}
            hasMore={!apiHit}
            threshold={600}
            loader={<CircularProgress />}
          >
          {
            postData?.map((val: any) => (
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
                avatar={val?.author?.avatar || ''}
                />
            ))
          }
          </InfiniteScroll>
      ) : (
        <PostBox>
          <Box sx={{ margin: '0rem 1rem 1rem' }}>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                margin: '10px',
                padding: "20px 0px",

              }}
            >
              <Box>
                <Skeleton
                  variant="circular"
                  sx={{ width: 50, height: 50, marginRight: "10px"  }}
                  animation="wave"
                />
              </Box>
              <Box>
                <Box>
                  <Skeleton
                    variant="text"
                    height={25}
                    animation="wave"
                  />
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
              <Skeleton
                variant="rounded"
                height={300}
                animation="wave"
                
              />
            </Box>
            <Skeleton
              variant="text"
              height={30}
              animation="wave"
            />{' '}
          </Box>
        </PostBox>
      )}
    </>
  );
}
