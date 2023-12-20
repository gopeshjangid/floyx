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

export const postServices = createApi({
  reducerPath: 'postsReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getPostDetail: builder.query<PostDetailResult, string>({
      query: id => `${ApiEndpoint.GetPosts}/post/${id}`,
      transformResponse: (response: any) => response?.value?.data,
      providesTags: ['postDetail'],
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

      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },

      providesTags: ['PostListByUser'],
    }),
    getPosts: builder.query<PostDetailResult[], PostDetail>({
      query: ({ pageNumber, postCreatedDate }) => {
        console.log(pageNumber, postCreatedDate, 'paramas');
        const apiEndPoint = ApiEndpoint.GetPosts + `/feed/main`;
        if (!pageNumber) {
          return apiEndPoint;
        }
        return `${apiEndPoint}?page=${pageNumber}&postCreatedDate=${postCreatedDate}`;
      },
      providesTags: result =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }: any) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Posts', id: 'LIST' }],
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      // // Always merge incoming data to the cache entry
      merge: (currentCache, newItems) => {
        console.log('merge', currentCache, newItems);
        currentCache.push(...newItems);
      },
      // // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        console.log(
          'forceReftch',
          currentArg,
          previousArg,
          currentArg !== previousArg
        );
        return currentArg !== previousArg;
      },
      transformResponse: (response: any) => response?.value?.data || [],
      // {
      //   return {
      //     response: response?.value?.data || [],
      //     allPostRecived: response?.value?.data < 10,
      //   }
      // },
    }),
    createPost: builder.mutation<any, FormData>({
      query: initialPost => ({
        url: `${ApiEndpoint.AddNewPost}`,
        method: 'POST',
        body: initialPost,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    deletePost: builder.mutation<any, string>({
      query: id => ({
        url: `${ApiEndpoint.DeletePost}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
  tagTypes: ['Posts', 'postDetail', 'UserPostList', 'PostListByUser'],
});

export const {
  useGetPostsQuery,
  useGetPostDetailQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetPostListByUserQuery,
} = postServices;
