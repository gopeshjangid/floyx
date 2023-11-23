// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import type { ReduxState } from '../../store';

interface User {
  id: number;
  name: string;
  email: string;
}

// Base query using fetchBaseQuery and caching
const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    // Use getState to get the current token from the store
    const token = (getState() as ReduxState).auth.token;
    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const userService = createApi({
  reducerPath: 'userService',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getCurrentUser: builder.query<User, void>({
      query: () => '/users/current',
      // ProvidesTags can be used for automatic re-fetching when data is mutated
      providesTags: (result, error, arg) => [{ type: 'User', id: 'CURRENT' }],
    }),
    // Add other endpoints if needed
  }),
  // Enable caching, invalidation, and other features
  tagTypes: ['User'],
});

export const { useGetCurrentUserQuery } = userService;

// Usage in a React component:
const UserProfile = () => {
  const { data: user, error, isLoading } = useGetCurrentUserQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching user data</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user?.name}</p>
      <p>Email: {user?.email}</p>
    </div>
  );
};

export default UserProfile;
