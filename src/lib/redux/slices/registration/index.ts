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
  reducerPath: 'registerReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    register: builder.mutation({
      query: body => ({
        url: ApiEndpoint.Register,
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: any) => response?.value?.code,
      transformErrorResponse: (response: any): string[] =>
        response?.data.value.code,
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
    resendMail: builder.mutation({
      query: body => ({
        url: ApiEndpoint.ResendVerficationToken,
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: any) => response?.value?.code,
    }),
    resetPassword: builder.mutation({
      query: body => ({
        url: ApiEndpoint.ResetPasswordCreateToken,
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: any) => response?.value?.code,
    }),
    verifyToken: builder.mutation({
      query: body => ({
        url: ApiEndpoint.VerifyToken,
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: any) => response?.value?.code,
    }),
    verifyResetPassword: builder.mutation({
      query: body => ({
        url: ApiEndpoint.ResetPasswordVerify,
        method: 'POST',
        body: body,
      }),
      transformResponse: (response: any) => response?.value?.code,
    }),
    login2fa: builder.mutation({
      query: body => ({
        url: ApiEndpoint.Login2fa,
        method: 'POST',
        body: body,
      }),
    }),
    login: builder.mutation({
      query: body => ({
        url: ApiEndpoint.Login,
        method: 'POST',
        body: body,
      }),
    }),
  }),
  tagTypes: ['registration'],
});

export const {
  useRegisterMutation,
  useCheckEmailMutation,
  useCheckUsernameMutation,
  useLazyCheckPhoneQuery,
  useVerifyOtpMutation,
  useResendMailMutation,
  useVerifyTokenMutation,
  useLogin2faMutation,
  useLoginMutation,
  useResetPasswordMutation,
  useVerifyResetPasswordMutation,
} = registrationService;
