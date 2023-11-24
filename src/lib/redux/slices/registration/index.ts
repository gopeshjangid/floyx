import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { getCookie } from 'cookies-next';
import { FLOYX_TOKEN } from '@/constants';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: headers => {
    headers.set('authorization', `Bearer ${getCookie(FLOYX_TOKEN)}`);
    return headers;
  },
});

export const registrationService = createApi({
  reducerPath: 'registration',
  baseQuery: baseQuery,
  endpoints: builder => ({
    register: builder.mutation({
      query: body => ({
        url: ApiEndpoint.Register,
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: any) => response?.value?.code,
      transformErrorResponse: (response: any): string[] => response?.data.value.code,
    }),
    checkUsername: builder.mutation({
      query: body => ({
        url: ApiEndpoint.CheckUser,
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: any) => response?.value?.code,
    }),
    checkEmail: builder.mutation({
      query: body => ({
        url: ApiEndpoint.CheckMail,
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: any) => response?.value?.code,
    }),
    checkPhone: builder.query({
      query: body => ({
        url: ApiEndpoint.CheckPhoneNumber,
        method: 'GET',
        params: body,
      }),
      transformResponse: (response: any) => response?.value?.code,
    }),
    verifyOtp: builder.mutation({
      query: body => ({
        url: ApiEndpoint.VerifyOTPCode,
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: any) => response?.value?.code,
      transformErrorResponse: (response: any) => response?.data.value.code,
    }),
  }),
  tagTypes: ['registration'],
});

export const { useRegisterMutation, useCheckEmailMutation, useCheckUsernameMutation, useLazyCheckPhoneQuery, useVerifyOtpMutation } =
  registrationService;
