'use client';
import { useState } from 'react';
import { tokenService } from '../services/new/tokenService';

// Define a generic interface for the hook's return type
interface UseQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  fetchData: ({ method, data, urlEndPoint }: IFetch) => Promise<void>;
}

interface IFetch {
  method: string;
  data?: any;
  urlEndPoint?: string;
}

// Update the useQuery hook to handle both GET and POST requests
const useQuery = <T,>(endpoint?: string): UseQueryResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async ({ method, data, urlEndPoint }: IFetch) => {
    setIsLoading(true);
    setError(null);

    try {
      let url = method === 'GET' ? urlEndPoint : endpoint;
      const fetchOptions: RequestInit = { method: method };

      fetchOptions.headers = {
        Authorization: tokenService.getBearerToken() || '',
      };

      // Handle GET requests by appending query parameters
      if (method.toUpperCase() === 'GET' && data) {
        const queryString = new URLSearchParams(data).toString();
        url += `?${queryString}`;
      } else if (data) {
        // Handle POST, PUT, PATCH, etc., by including the data in the request body
        fetchOptions.body = JSON.stringify(data);
        fetchOptions.headers = {
          ...fetchOptions.headers,
          'Content-Type': 'application/json',
        };
      }

      const response = await fetch(url || '', fetchOptions);
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized access - please login');
        }
        throw new Error('An error occurred while fetching data');
      }
      const result = (await response.json()) as T;
      setData(result);
    } catch (err) {
      setError((err as Error).message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { fetchData, data, isLoading, error };
};

export default useQuery;
