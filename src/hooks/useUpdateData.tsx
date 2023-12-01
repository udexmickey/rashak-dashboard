import { useState } from "react";
import { Url } from "url";

interface UseUpdateDataResult<T> {
  updateData: (url: string | Url, data: Partial<T>) => Promise<void>;
  loading: boolean;
  isError: boolean | null;
  error: string | null;
}

const useUpdateData = <T,>(): UseUpdateDataResult<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState<boolean | null>(null);

  const updateData = async (
    url: string | Url,
    data: Partial<T>
  ): Promise<void> => {
    setLoading(true);
    try {
      // Assuming you make a PATCH request to your API
      const response = await fetch(`${url}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          // Add other headers as needed
        },
        body: JSON.stringify(data),
        // Add credentials if needed
      });

      if (!response.ok) {
        // Handle non-successful response
        setIsError(true);
        throw new Error(`Failed to update data: ${response.statusText}`);
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

  return { updateData, loading, error, isError };
};

export default useUpdateData;
