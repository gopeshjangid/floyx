import { getCookie } from 'cookies-next';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { FLOYX_TOKEN } from '@/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: headers => {
    headers.set('authorization', `Bearer ${getCookie(FLOYX_TOKEN)}`);
    return headers;
  },
});

export const notificationApiService = createApi({
  reducerPath: 'notification',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getUserBySearch: builder.query({
      query: text => ({
        url: `${ApiEndpoint.FindUserByName}/${text}/true`,
        method: 'GET',
      }),
      transformErrorResponse: (response: any): string[] =>
        response?.data.value.code,
    }),
    deleteMessage: builder.mutation({
      query: ({ username }) => ({
        url: `${ApiEndpoint.DeleteMessage}/${username}`,
        method: 'DELETE',
      }),
      transformErrorResponse: (response: any): string[] =>
        response?.data.value.code,
    }),
  }),
});

export const { useLazyGetUserBySearchQuery, useDeleteMessageMutation } =
  notificationApiService;
