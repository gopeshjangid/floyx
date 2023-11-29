/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';

interface Posts {
  postData: Array<string>;
  allPostRecived: boolean;
}
// Define a type for the slice state
const initialState: Posts = {
  postData: [],
  allPostRecived: true,
}
const newtoken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJzdWIiOiI1ZWZkYmYxNGZiNmJlNTAwMDFjYmMzNmMiLCJ1bmlxdWVfbmFtZSI6IjVlZmRiZjE0ZmI2YmU1MDAwMWNiYzM2YyIsImp0aSI6IjQ3YjUxZGU1LTI3ZGItNDZkMS1iNTY2LTE1M2RiZGM2MzNkZiIsImlhdCI6IjE3MDEyNDExNzA3MzQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVlZmRiZjE0ZmI2YmU1MDAwMWNiYzM2YyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvaXNwZXJzaXN0ZW50IjoiZmFsc2UiLCJuYmYiOjE3MDEyNDExNzAsImV4cCI6MTcwMTI0NDc3MCwiaXNzIjoiZmxveXgifQ.1IAr2oSGIU-phRXiNz28NPaRD44Es_vuts5FnH_gEVY';

// Base query using fetchBaseQuery and caching
const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    console.log('calling apis');
    // Use getState to get the current token from the store
    // const token = (getState() as ReduxState).auth.token;
    // // If we have a token set in state, let's assume that we should be passing it.
    // if (token) {
    headers.set('authorization', `Bearer ${newtoken}`);
    // }
    return headers;
  },
});

export const postServices = createApi({
  reducerPath: 'postsReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getPostDetail: builder.query<any, void>({
      query: (id) => `${ApiEndpoint.GetPosts}/post/${id}`,
      transformResponse: (response: any) => response?.value?.data,
    }),
    getPosts: builder.query<any, string>({
      query: ({ pageNumber, postCreatedDate }:any) => {
        const apiEndPoint = ApiEndpoint.GetPosts + `/feed/main`;
        if (!pageNumber) {
          return apiEndPoint;
        } 
        return `${apiEndPoint}?page=${pageNumber}&postCreatedDate=${postCreatedDate}`;
      },
      providesTags:(result) =>
        // is result available?
        result
          ? // successful query
            [
              ...result.map(({ id }:any) => ({ type: 'Posts', id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type: 'Posts', id: 'LIST' }` is invalidated
            [{ type: 'Posts', id: 'LIST' }],
      // Only have one cache entry because the arg always maps to one string
      // serializeQueryArgs: ({ endpointName }) => {
      //   return endpointName
      // },
      // // Always merge incoming data to the cache entry
      // merge: (currentCache, newItems) => {
      //   console.log(currentCache.response, newItems);
      //   currentCache.push(...newItems)
      // },
      // // Refetch when the page arg changes
      // forceRefetch({ currentArg, previousArg }) {
      //   console.log(currentArg, previousArg, currentArg !== previousArg);
      //   return currentArg !== previousArg
      // },
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
    deletePost: builder.mutation<any, void>({
      query: (id) =>({
        url: `${ApiEndpoint.DeletePost}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    })
  }),
  tagTypes: ['Posts'],
  
});

export const {
  useGetPostsQuery,
  useGetPostDetailQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} = postServices;
