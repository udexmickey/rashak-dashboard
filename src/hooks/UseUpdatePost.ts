import { PostData, postUpload } from '@/utils/types/PostData.types';
import { useState } from 'react';

interface UseUpdatePostResult {
  updatePost: (postData: Partial<postUpload>) => Promise<void>;
  loading: boolean;
  isError: boolean | null;
  error: string | null;
}

const useUpdatePost = (postId: string): UseUpdatePostResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);

  const updatePost = async (postData: Partial<postUpload>): Promise<void> => {
    setLoading(true);

    try {
      // Assuming you make a PATCH request to your API
      const response = await fetch(
        `https://6567770364fcff8d73106d0b.mockapi.io/api/v1/content-magament/${postId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            // Add other headers as needed
          },
          body: JSON.stringify(postData),
        }
      );

      if (!response.ok) {
        // Handle non-successful response
        setIsError(true);
        throw new Error(`Failed to update post: ${response.statusText}`);
      }

      if (response.ok) setIsError(false);

      // Update successful
    } catch (err: any) {
      // Handle errors during update
      setError(err.message);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return { updatePost, loading, error, isError };
};

export default useUpdatePost;
