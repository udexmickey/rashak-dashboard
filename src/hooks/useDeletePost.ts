import { useState } from 'react';

interface UseDeletePostResult {
  deletePost: () => Promise<void>;
  loading: boolean;
  isError: boolean | null;
  error: string | null;
}

const useDeletePost = (postId: string): UseDeletePostResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);

  const deletePost = async (): Promise<void> => {
    setLoading(true);
    try {
      // Assuming you make a DELETE request to your API
      const response = await fetch(`
      https://6567770364fcff8d73106d0b.mockapi.io/api/v1/content-magament/${postId}`, 
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
