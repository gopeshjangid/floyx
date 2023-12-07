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

export const accountSettingService = createApi({
  reducerPath: 'accountSetting',
  baseQuery: baseQuery,
  tagTypes: ['accountSetting', 'blockUser'],
  endpoints: builder => ({
    getSettings: builder.query({
      query: () => ({
        url: ApiEndpoint.Settings,
        method: 'GET',
      }),
      providesTags: ['accountSetting'],
      transformResponse: (response: any) => response?.value?.data,
      transformErrorResponse: (response: any): string[] =>
        response?.data.value.code,
    }),
    getMessageSettings: builder.query({
      query: () => ({
        url: ApiEndpoint.MessageSetting,
        method: 'GET',
      }),
      providesTags: ['accountSetting'],
      transformResponse: (response: any) => response?.value?.data,
      transformErrorResponse: (response: any): string[] =>
        response?.data.value.code,
    }),
    updateSettings: builder.mutation({
      query: body => ({
        url: ApiEndpoint.UpdateSettings,
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: any) => response?.value?.code,
      transformErrorResponse: (response: any): string[] =>
        response?.data.value.code,
      invalidatesTags: ['accountSetting'],
    }),
    updateMessageSettings: builder.mutation({
      query: body => ({
        url: ApiEndpoint.MessageSetting,
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: any) => response?.value?.code,
      transformErrorResponse: (response: any): string[] =>
        response?.data.value.code,
      invalidatesTags: ['accountSetting'],
    }),
    changePassword: builder.mutation({
      query: body => ({
        url: ApiEndpoint.ChangePassword,
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: any) => response?.value?.code,
      transformErrorResponse: (response: any): string[] =>
        response?.data.value.code,
    }),
    getBlockedUsers: builder.query({
      query: () => ({
        url: ApiEndpoint.GetBlockedUsers,
        method: 'GET',
      }),
      providesTags: ['blockUser'],
      transformResponse: (response: any) => response?.value?.data,
      transformErrorResponse: (response: any): string[] =>
        response?.data.value.code,
    }),
    unblockUser: builder.mutation({
      query: ({ username }) => ({
        url: `${ApiEndpoint.UnblockedUsers}/${username}`,
        method: 'POST',
      }),
      transformResponse: (response: any) => response?.value?.code,
      transformErrorResponse: (response: any): string[] =>
        response?.data.value.code,
      invalidatesTags: ['blockUser'],
    }),
  }),
});

export const {
  useUpdateSettingsMutation,
  useUpdateMessageSettingsMutation,
  useChangePasswordMutation,
  useGetBlockedUsersQuery,
  useUnblockUserMutation,
  useGetSettingsQuery,
  useGetMessageSettingsQuery,
} = accountSettingService;
