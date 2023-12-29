/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { baseQuery } from '@/lib/utils';

interface PopularTags {
  tagId: string;
  tagName: string;
}

export const tagServices = createApi({
  reducerPath: 'tagsReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getPopularTags: builder.query<PopularTags[], void>({
      query: () => `${ApiEndpoint.GetPopularTags}`,
      transformResponse: (response: any) => response?.value?.data,
      // providesTags: ['popularTags'],
    }),
    getArticleByTags: builder.query<any, any>({
      query: ({ tagId }) => `${ApiEndpoint.GetArticleByTag}?tagId=${tagId}`,
      transformResponse: (response: any) => response?.value?.data,
    })
  }),
  tagTypes: ['popularTags'],
});

export const {
  useGetPopularTagsQuery,
  useLazyGetArticleByTagsQuery,
} = tagServices;
