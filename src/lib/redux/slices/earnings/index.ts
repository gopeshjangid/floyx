/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { getCookie } from 'cookies-next';
import { FLOYX_TOKEN } from '@/constants';

interface Wallet {
  availableBalance: number;
  totalAmountWithdrew: number;
  totalBalance: number;
  walletAddress: string;
  id: string;
}

// Base query using fetchBaseQuery and caching
const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    console.log('calling apis');
    // Use getState to get the current token from the store
    // const token = (getState() as ReduxState).auth.token;
    // // If we have a token set in state, let's assume that we should be passing it.
    // if (token) {
    headers.set('authorization', `Bearer ${getCookie(FLOYX_TOKEN)}`);
    // }
    return headers;
  },
});

export const earningsService = createApi({
  reducerPath: 'earningsReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getTransactionHistory: builder.query<Wallet, void>({
      query: () => ApiEndpoint.GetTransactionHistory,
      transformResponse: (response: any) => response?.value?.data,
    }),
    getUserWallet: builder.query<Wallet, void>({
      query: () => ApiEndpoint.UserWallet,
      transformResponse: (response: any) => response?.value?.data,
    }),
    getTipHistory: builder.query<Wallet, void>({
      query: () => ApiEndpoint.UserTipHistory,
      transformResponse: (response: any) => response?.value?.data,
    }),

    // Add other endpoints if needed
  }),
  // Enable caching, invalidation, and other features
  tagTypes: ['TransactionHistory'],
});

export const { useGetTransactionHistoryQuery, useGetTipHistoryQuery, useGetUserWalletQuery, useLazyGetTransactionHistoryQuery } =
  earningsService;
