import { getCookie } from 'cookies-next';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { FLOYX_TOKEN } from '@/constants';
import { profileService } from '../profile';

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
      onQueryStarted: (arg, api) => {
        api.queryFulfilled.then(response => {
          api.dispatch(profileService.util.invalidateTags([{ type: 'profileDetails' }]));
        })
      }
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
    enable2faFirstStep: builder.mutation({
      query: () => ({
        url: ApiEndpoint.Enable2faFirstStep,
        method: 'POST',
      }),
      transformResponse: (response: any) => response?.value?.data,
      transformErrorResponse: (response: any): string[] =>
        response?.data.value.code,
    }),
    enable2faSecondStep: builder.mutation({
      query: () => ({
        url: ApiEndpoint.Enable2faSecondStep,
        method: 'POST',
      }),
      transformResponse: (response: any) => response?.value?.data,
      transformErrorResponse: (response: any): string[] =>
        response?.data.value.code,
    }),
    enable2faVerifyStep: builder.mutation({
      query: body => ({
        url: ApiEndpoint.Enable2faVerifyStep,
        method: 'POST',
        body: body,
      }),
    }),
    disable2fa: builder.mutation({
      query: () => ({
        url: ApiEndpoint.Disable2fa,
        method: 'POST',
      }),
      transformResponse: (response: any) => response?.value?.code,
      transformErrorResponse: (response: any): string[] =>
        response?.data.value.code,
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
  useEnable2faFirstStepMutation,
  useEnable2faSecondStepMutation,
  useEnable2faVerifyStepMutation,
  useDisable2faMutation,
} = accountSettingService;
