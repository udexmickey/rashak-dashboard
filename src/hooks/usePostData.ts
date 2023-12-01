import { useState } from 'react';
import { Url } from 'url';

interface UsePostDataResult<T> {
  postData: (url: string | Url, data: T) => Promise<void>;
  loading: boolean;
  isError: boolean | null;
  error: string | null;
}

const usePostData = <T>(): UsePostDataResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);

  const postData = async (url: string | Url, data: T): Promise<void> => {
    setLoading(true);
    try {
      // Assuming you make a POST request to your API
      const response = await fetch(`${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add other headers if needed
        },
        body: JSON.stringify(data),
        // Add credentials if needed
      });

      if (!response.ok) {
        // Handle non-successful response
        setIsError(true);
        throw new Error(`Failed to post data: ${response.statusText}`);
      }

      if (response.ok) setIsError(false);

      // Posting successful
    } catch (err: any) {
      // Handle errors during posting
      setError(err.message);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return { postData, loading, error, isError };
};

export default usePostData;
