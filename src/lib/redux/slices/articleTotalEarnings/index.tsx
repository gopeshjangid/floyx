/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';

interface Earning {
  // articleId: string,
  // articlePublicUrl: string,
  // articleTipAmount: number,
  // articleUserId: string,
  // userTipAmount: number
}

const newtoken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJzdWIiOiI1ZWZkYmYxNGZiNmJlNTAwMDFjYmMzNmMiLCJ1bmlxdWVfbmFtZSI6IjVlZmRiZjE0ZmI2YmU1MDAwMWNiYzM2YyIsImp0aSI6IjBhYjU0MjZjLTRhYmMtNGE5Yy1hYTBhLTg2ZTNkYzUyODQ1NiIsImlhdCI6IjE3MDExNTEzMjMwODgiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVlZmRiZjE0ZmI2YmU1MDAwMWNiYzM2YyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvaXNwZXJzaXN0ZW50IjoiZmFsc2UiLCJuYmYiOjE3MDExNTEzMjMsImV4cCI6MTcwMTE1NDkyMywiaXNzIjoiZmxveXgifQ.l9K76fzOXWUcJY9pEbbZogI7LfYim3OEoFQRMoWjPrI';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    console.log('calling apis');
    headers.set('authorization', `Bearer ${newtoken}`);
    // }
    return headers;
  },
});

export const articleTotalEarnings = createApi({
  reducerPath: 'articleTotalEarningsReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getArticleTotalEarnings: builder.query<any, string>({
      query: (articleId) => `${ApiEndpoint.ArticleTotalEarning}/${articleId}`,
      transformResponse: (response: any) => response?.value?.data,
      providesTags: ['articleTip'],
    }),
    setTip: builder.mutation<any, string>({
      query: (payload) => ({
        url: `${ApiEndpoint.TipArticle}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['articleTip'],
    }),
  }),
  tagTypes: ['articleTip'],
});

export const { useGetArticleTotalEarningsQuery, useSetTipMutation } = articleTotalEarnings;
