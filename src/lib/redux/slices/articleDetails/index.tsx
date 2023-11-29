/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';

interface Article {}

const newtoken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJzdWIiOiI1ZWZkYmYxNGZiNmJlNTAwMDFjYmMzNmMiLCJ1bmlxdWVfbmFtZSI6IjVlZmRiZjE0ZmI2YmU1MDAwMWNiYzM2YyIsImp0aSI6ImE4NjVmMmE2LTAzNGMtNDdlNi1hZGYyLTQxNmQ5MDZhZjYyNSIsImlhdCI6IjE3MDA5OTkzMTI5NjUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVlZmRiZjE0ZmI2YmU1MDAwMWNiYzM2YyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvaXNwZXJzaXN0ZW50IjoiZmFsc2UiLCJuYmYiOjE3MDA5OTkzMTIsImV4cCI6MTcwMTAwMjkxMiwiaXNzIjoiZmxveXgifQ.FgxLA7R7S-2ts7GStPrfSBx509WXtNPRDxs3-HonwaE';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    console.log('calling apis');
    headers.set('authorization', `Bearer ${newtoken}`);
    // }
    return headers;
  },
});

export const artcileDetails = createApi({
  reducerPath: 'artcileDetailsReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getArticleDetails: builder.query<any, any>({
      query: ({ userName, articlePuclicUrl }) => `${ApiEndpoint.GetArticles}/${userName}/${articlePuclicUrl}`,
      transformResponse: (response: any) => response?.value?.data,
    }),
  }),
  tagTypes: ['artcileDetails'],
});

export const { useGetArticleDetailsQuery } = artcileDetails;
