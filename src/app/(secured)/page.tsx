'use client';

import FollowNewAccounts from '@/components/AccountFollowBox';
//import NewRegisteredUsers from '@/components/FriendsActivity';
import RecentArticles from '@/components/PopularToday';
import AddPost from '@/components/Post/AddPost';
import PostList from '@/components/Post/PostList';
import PostHeader from '@/components/PostHeader';
import {
  PostDetailResult,
  postServices,
  useGetPostsQuery,
  useStore,
} from '@/lib/redux';

import { Box, Grid, Skeleton } from '@mui/material';
import {
  Suspense,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { getCookie } from 'cookies-next';

import * as signalR from '@microsoft/signalr';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import useDevice from '@/lib/hooks/useDevice';
import ProfileSetupModal from '@/components/ProfileSetupModal';
import { FIRST_TIME_LOGIN_USING_SOCIAL } from '@/constants';
export interface apiParams {
  pageNumber: number;
  postCreatedDate: number;
}

const SectionSkeleton = () => (
  <Skeleton variant="rectangular" width="100%" height="200px" />
);

export default function Page() {
  const [firstTimeLoginUsingSocialMedia, setFirstTimeLoginUsingSocialMedia] =
    useState<boolean | null>(null);

  useLayoutEffect(() => {
    if (
      [true, 'true'].includes(getCookie(FIRST_TIME_LOGIN_USING_SOCIAL) as any)
    ) {
      setFirstTimeLoginUsingSocialMedia(true);
    } else {
      setFirstTimeLoginUsingSocialMedia(false);
    }
  }, []);

  const [apiParams, setApiParams] = useState<apiParams>({
    pageNumber: 0,
    postCreatedDate: 0,
  });
  const { isMobile } = useDevice();
  const store = useStore({});
  const { data, isFetching } = useGetPostsQuery(apiParams);
  const postData = data?.postList;
  const hasMore = typeof data?.hasMore != 'undefined' ? data?.hasMore : true;
  const initSignalR = () => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(ApiEndpoint.BasePath + '/posthub', {
        accessTokenFactory: async () => {
          const token = getCookie('FLOYX_TOKEN');
          return token ?? '';
        },
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .build();
    connection.start().catch(err => console.log(err));
    connection.on('UpdatePost', (newPost: PostDetailResult) => {
      const { dispatch } = store;
      dispatch(
        postServices.util.updateQueryData(
          'getPosts',
          {
            pageNumber: 1,
            postCreatedDate: postData ? postData[0].post.createdDateTime : 0,
          },
          draft => {
            draft.postList.map(post => {
              if (post.id === newPost.id) {
                return { ...post, ...newPost };
              }
              return post;
            });
          }
        )
      );
    });
  };
  useEffect(() => {
    initSignalR();
  }, []);

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
    <>
      {firstTimeLoginUsingSocialMedia && (
        <ProfileSetupModal
          open={firstTimeLoginUsingSocialMedia}
          handleClose={() => setFirstTimeLoginUsingSocialMedia(false)}
          onSubmit={() => setFirstTimeLoginUsingSocialMedia(false)}
        />
      )}
      {firstTimeLoginUsingSocialMedia !== null &&
        !firstTimeLoginUsingSocialMedia && (
          <Box p={2} mt={isMobile ? 0 : 1}>
            <Grid container columnSpacing={{ xs: 1, sm: 3, md: 3 }}>
              <Grid item xs={12}>
                <Suspense fallback={<SectionSkeleton />}>
                  <PostHeader />
                </Suspense>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Box
                  sx={{
                    overflow: 'auto',
                    maxHeight: viewportHeight + 100,
                    overflowY: 'auto',
                    scrollbarWidth: 'none', // For Firefox
                    msOverflowStyle: 'none', // For IE 10+
                    '&::-webkit-scrollbar': {
                      display: 'none', // For Chrome, Safari, and newer versions of Edge
                    },
                  }}
                  id="mainContainerFeed"
                >
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
                <Box display={{ xs: 'none', sm: 'block' }}>
                  <Suspense fallback={<SectionSkeleton />}>
                    <RecentArticles />
                  </Suspense>
                </Box>
              </Grid>
            </Grid>
          </Box>
        )}
    </>
  );
}
