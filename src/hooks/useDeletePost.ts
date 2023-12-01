import { useState } from 'react';
import { Url } from 'url';

interface UseDeletePostResult {
  deletePost: (url: string | Url) => Promise<void>;
  loading: boolean;
  isError: boolean | null;
  error: string | null;
}

const useDeletePost = (id: string): UseDeletePostResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);

  const deletePost = async (url: string | Url): Promise<void> => {
    setLoading(true);
    try {
      // Assuming you make a DELETE request to your API
      const response = await fetch(`
      ${url}/${id}`, 
      {
        method: 'DELETE',
        // Add headers or credentials if needed
      });

      if (!response.ok) {
        // Handle non-successful response
        setIsError(prev => prev = true)
        throw new Error(`Failed to delete post: ${response.statusText}`);
      }

      if (response.ok)  setIsError(prev => prev = false)

      // Deletion successful
    } catch (err: any) {
      // Handle errors during deletion
      setError(err.message);
      setIsError(prev => prev = true)
    } finally {
      setLoading(false);
    }
  };

  return { deletePost, loading, error, isError };
};

export default useDeletePost;
