'use client';
import { useState, useEffect } from 'react';

// Define a generic interface for the hook's return type
interface UseQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  fetch: (data:any)=> void;
}

// Update the useQuery hook to be a generic hook
const useQuery = <T,>(endpoint: string): UseQueryResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

    const fetchData = async (data:any) => {
      setIsLoading(true);
      setError(null);

      try {
        //const response = await fetch(`${endpoint}?query=${encodeURIComponent(data)}`);
        const response = await fetch(endpoint, {method: 'POST', body: JSON.stringify(data)});
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized access - please login');
          }
          throw new Error('An error occurred while searching');
        }
        const result = await response.json() as T;
        setData(result);
      } catch (err) {
        setError((err as Error).message);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };


  return { fetch: fetchData, data, isLoading, error };
};

export default useQuery;
