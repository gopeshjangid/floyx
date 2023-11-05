import {  BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

// Define a custom base query using Axios
const axiosBaseQuery =
  (baseUrl: string = ''): BaseQueryFn<
    { url: string; method: AxiosRequestConfig['method']; data?: AxiosRequestConfig['data']; params?: AxiosRequestConfig['params'] },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      // Attempt the request
      const result = await axios({ url: url, method, data, params });
      // Return result if successful
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError as AxiosError;
      // Return error with a standardized format
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };



// Export the auto-generated hooks from your service
export default axiosBaseQuery;
