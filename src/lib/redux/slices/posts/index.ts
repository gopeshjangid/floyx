/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';

interface Post {
 
}

const newtoken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJzdWIiOiI1ZWZkYmYxNGZiNmJlNTAwMDFjYmMzNmMiLCJ1bmlxdWVfbmFtZSI6IjVlZmRiZjE0ZmI2YmU1MDAwMWNiYzM2YyIsImp0aSI6ImZmY2ZkY2VjLTVkYjUtNDY3ZC05NmI1LTdlYjcyMzVmZDVjZSIsImlhdCI6IjE3MDA4MjY1NDU2OTIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVlZmRiZjE0ZmI2YmU1MDAwMWNiYzM2YyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvaXNwZXJzaXN0ZW50IjoiZmFsc2UiLCJuYmYiOjE3MDA4MjY1NDUsImV4cCI6MTcwMDgzMDE0NSwiaXNzIjoiZmxveXgifQ.dajXF0UKnlN5ieUPviwRyXRqAzrmpZuXnaqYyz1fx6Q';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    console.log('calling apis');
    headers.set('authorization', `Bearer ${newtoken}`);
    // }
    return headers;
  },
});

export const postServices = createApi({
  reducerPath: 'postReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getPostDetail: builder.query<Post, void>({
      query: (id) => `${ApiEndpoint.GetPosts}/post/${id}`,
      transformResponse: (response: any) => response?.value?.data,
    }),
   }),
  tagTypes: ['PostDetails'],
});

export const { useGetPostDetailQuery } = postServices;
