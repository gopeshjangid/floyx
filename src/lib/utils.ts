import moment from 'moment';
import { getCookie, deleteCookie } from 'cookies-next';

import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const getRelativeTime = (date: string) => {
  const dateObject = new Date(date);
  const sec = dateObject.getSeconds();
  const min = dateObject.getMinutes();
  const hh = dateObject.getHours();
  const dd = dateObject.getDate();
  const mm = dateObject.getMonth();
  const yyyy = dateObject.getFullYear();
  date = `${moment([yyyy, mm, dd, hh, min, sec]).fromNow(true)} ago`;
  return date;
};
import { NextRouter } from 'next/router';

// Define a helper function to check if we're on the server
const isServer = () => typeof window === 'undefined';

const redirectToLogin = () => {
  if (!isServer()) {
    //const router: NextRouter = require('next/router').default;
    window.location.href = '/login';
    //router.push('/login').catch(e => console.error('Redirection Error:', e));
  }
  // Server-side redirects should be handled in getServerSideProps or getInitialProps
};

export const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers, { getState }) => {
    const token = getCookie(
      'FLOYX_TOKEN',
      isServer() ? getState()?.req : undefined
    );
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  responseHandler: async response => {
    if (response.status === 401) {
      deleteCookie('FLOYX_TOKEN');
      deleteCookie('next-auth.session-token');
      redirectToLogin();
      return;
    }
    // You need to return a valid response format here
    return response.json();
  },
});
