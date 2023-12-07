'use client';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller'
import { Box, CircularProgress, Skeleton } from '@mui/material';

import { PostBox } from './styledPostBox';
import Post from './Post';
import { useGetPostsQuery } from "@/lib/redux/slices/posts";

export default function PostList() {
  const [apiParams, setApiParams] = useState<{
    pageNumber: number;
    postCreatedDate: number;
  }>({
    pageNumber: 0,
    postCreatedDate: 0,
  });
  const [apiHit, setApiHit] = useState(false);
  const { data: postData, isFetching } = useGetPostsQuery(apiParams);

  const loadMore = (e:any, pageNumber: number, isFetching: boolean, apiHit: boolean) => {
    // console.log(isFetching, 'afdsdfsdfasfd')
    const lastPost = postData[postData.length - 1];
  
    if (e > pageNumber && lastPost !== undefined && !isFetching && !apiHit) {
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
            loadMore={(e:any) => loadMore(e, apiParams?.pageNumber, isFetching, apiHit)}
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