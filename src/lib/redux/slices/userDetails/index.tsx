/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';

interface User {}

const newtoken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6IkpXVCJ9.eyJzdWIiOiI1ZWZkYmYxNGZiNmJlNTAwMDFjYmMzNmMiLCJ1bmlxdWVfbmFtZSI6IjVlZmRiZjE0ZmI2YmU1MDAwMWNiYzM2YyIsImp0aSI6ImJmZTUyODgwLTA5MDgtNGJjNS04NGEwLTdlYmU4NTFiYzI5OSIsImlhdCI6IjE3MDA5ODMyNzQwMzYiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjVlZmRiZjE0ZmI2YmU1MDAwMWNiYzM2YyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvaXNwZXJzaXN0ZW50IjoiZmFsc2UiLCJuYmYiOjE3MDA5ODMyNzQsImV4cCI6MTcwMDk4Njg3NCwiaXNzIjoiZmxveXgifQ.WCpnEMAxde0FNK_d16QVMgVmUvdb-ido6I9xdOVGAA0';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    console.log('calling apis');
    headers.set('authorization', `Bearer ${newtoken}`);
    // }
    return headers;
  },
});

export const userDetails = createApi({
  reducerPath: 'userDetailsReducer',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getUserDetails: builder.query<User, string>({
      query: userName => `${ApiEndpoint.CurrentUserDetails}/${userName}`,
      transformResponse: (response: any) => response?.value?.data,
    }),
  }),
  tagTypes: ['userDetails'],
});

export const { useGetUserDetailsQuery } = userDetails;
