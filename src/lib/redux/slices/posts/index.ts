/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { baseQuery } from '@/lib/utils';

interface Posts {
  postData: Array<string>;
  allPostRecived: boolean;
}
// Define a type for the slice state
const initialState: Posts = {
  postData: [],
  allPostRecived: true,
};

interface PostDetail {
  pageNumber: number;
  postCreatedDate: number;
}

interface Author {
  id: string;
  name: string;
  username: string;
  avatar: string;
  official: boolean;
  accountType: number;
}

export interface Post {
  id: string;
  createdDateTime: number;
  numberOfComments: number;
  numberOfShares: number;
  numberOfLikes: number;
  likedByAuthor: boolean;
  type: number;
  content: string;
  image: {
    thumbnailPath: string;
    path: string;
  };
  link: null | string;
  shared: null | string;
  promoted: boolean;
  isSharedPostAvailable: boolean;
}

export interface PostDetailResult {
  author: Author;
  id: string;
  lastComment: string;
  post: Post;
}

type PostListByUserArgs = {
  username: string;
  pageNumber?: number;
  postCreatedDate: number;
};

interface sharePostArgs {
  postId: string;
  payload: {
    content: string;
  };
}

export const postServices = createApi({
  reducerPath: 'postsReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getPostDetail: builder.query<PostDetailResult, string>({
      query: id => `${ApiEndpoint.GetPosts}/post/${id}`,
      transformResponse: (response: any) => response?.value?.data,
      providesTags: ['postDetail'],
    }),
    sharePost: builder.mutation<any, sharePostArgs>({
      query: ({ postId, payload }) => ({
        url: `${ApiEndpoint.SharePost}/${postId}`,
        method: 'POST',
        body: payload,
      }),
      transformResponse: (response: any) => response?.value?.data || {},
      invalidatesTags: ['MainFeedList'],
      onQueryStarted: async (arg, { queryFulfilled, dispatch, getState }) => {
        try {
          const { data } = await queryFulfilled;
          const currentState = getState().postsReducer;
          dispatch(
            postServices.util.updateQueryData(
              'getPosts',
              {
                pageNumber: 1,
                postCreatedDate: (currentState.queries['getPosts'] as any)?.data
                  .postList[0]?.post.createdDateTime,
              },
              draft => {
                draft.postList.map(post => {
                  if (post.id === arg.postId) {
                    post.post.numberOfShares = post.post.numberOfShares + 1;
                  }
                });
                draft.postList.unshift(data);
              }
            )
          );
          //}
        } catch (error) {
          console.error('Failed to fetch latest posts:', error);
        }
      },
    }),
    getPostListByUser: builder.query<
      { postList: PostDetailResult[]; hasMore: boolean },
      PostListByUserArgs
    >({
      query: ({ pageNumber, postCreatedDate, username }) => {
        const apiEndPoint = ApiEndpoint.GetPosts + `/${username}`;
        if (!pageNumber) {
          return apiEndPoint;
        }
        return `${apiEndPoint}?page=${pageNumber}&postCreatedDate=${postCreatedDate}`;
      },
      transformResponse: (response: any) => ({
        postList: response?.value?.data || [],
        hasMore: response?.value?.hasMore,
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        return JSON.stringify(queryArgs);
      },
      merge: (currentCache, newItems, otherArgs) => {
        if (currentCache) {
          return {
            postList: [...currentCache.postList, ...newItems.postList],
            hasMore: newItems.postList.length === 10,
          };
        } else
          return {
            postList: [...newItems.postList],
            hasMore: newItems.postList.length === 10,
          };
      },

      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },

      providesTags: (result, error, arg) => [
        {
          type: 'PostListByUser',
          id: `${arg.username}-${arg.pageNumber}-${arg.postCreatedDate}`,
        },
      ],
    }),
    getPosts: builder.query<
      { postList: PostDetailResult[]; hasMore: boolean },
      PostDetail
    >({
      query: ({ pageNumber, postCreatedDate }) => {
        const apiEndPoint = ApiEndpoint.GetPosts + `/feed/main`;
        if (!pageNumber) {
          return apiEndPoint;
        }
        return `${apiEndPoint}?page=${pageNumber}&postCreatedDate=${postCreatedDate}`;
      },
      transformResponse: (response: any) => ({
        postList: response?.value?.data || [],
        hasMore: response?.value?.hasMore,
      }),
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems, otherArgs) => {
        if (currentCache) {
          return {
            postList: [...currentCache.postList, ...newItems.postList],
            hasMore: newItems.postList.length === 10,
          };
        } else
          return {
            postList: [...newItems.postList],
            hasMore: newItems.postList.length === 10,
          };
      },
      providesTags: (result, error, arg) => [
        {
          type: 'MainFeedList',
          id: `main-feed-${arg.pageNumber}-${arg.postCreatedDate}`,
        },
      ],
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    createPost: builder.mutation<any, FormData>({
      query: initialPost => ({
        url: `${ApiEndpoint.AddNewPost}`,
        method: 'POST',
        body: initialPost,
      }),
      transformResponse: (response: any) => response?.value?.data,
      onQueryStarted: async (arg, { queryFulfilled, dispatch, getState }) => {
        try {
          const { data } = await queryFulfilled;
          const currentState = getState().postsReducer;
          console.log('Query updating onquery satrted====', currentState);
          dispatch(
            postServices.util.updateQueryData(
              'getPosts',
              {
                pageNumber: 1,
                postCreatedDate: (currentState.queries['getPosts'] as any)?.data
                  .postList[0]?.post.createdDateTime,
              },
              draft => {
                draft.postList.unshift(data);
              }
            )
          );
          //}
        } catch (error) {
          console.error('Failed to fetch latest posts:', error);
        }
      },
    }),
    deletePost: builder.mutation<any, string>({
      query: id => ({
        url: `${ApiEndpoint.DeletePost}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
  tagTypes: [
    'Posts',
    'postDetail',
    'UserPostList',
    'PostListByUser',
    'MainFeedList',
    'LatestMainFeedList',
  ],
});

export const {
  useGetPostsQuery,
  useGetPostDetailQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostListByUserQuery,
  useSharePostMutation,
} = postServices;
