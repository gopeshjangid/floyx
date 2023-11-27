/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';

interface Wallet {
  availableBalance: number;
  totalAmountWithdrew: number;
  totalBalance: number;
  walletAddress: string;
  id: string;
}

const newtoken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJzdWIiOiI1ZWZkYmYxNGZiNmJlNTAwMDFjYmMzNmMiLCJ1bmlxdWVfbmFtZSI6IjVlZmRiZjE0ZmI2YmU1MDAwMWNiYzM2YyIsImp0aSI6IjBjZGJkNTI5LWRjM2ItNGRhZS05MzBmLWIzYTEwNmQ3OGI0ZSIsImlhdCI6IjE3MDA4MTg2ODIyNzUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVlZmRiZjE0ZmI2YmU1MDAwMWNiYzM2YyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvaXNwZXJzaXN0ZW50IjoiZmFsc2UiLCJuYmYiOjE3MDA4MTg2ODIsImV4cCI6MTcwMDgyMjI4MiwiaXNzIjoiZmxveXgifQ.pANuoLfceIbmvcZDVVMWR_PFHzvgfD6IlrfY67utQzQ';
// Base query using fetchBaseQuery and caching
const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    console.log('calling apis');
    // Use getState to get the current token from the store
    // const token = (getState() as ReduxState).auth.token;
    // // If we have a token set in state, let's assume that we should be passing it.
    // if (token) {
    headers.set('authorization', `Bearer ${newtoken}`);
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
