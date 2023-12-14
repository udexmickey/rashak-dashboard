import { logOutApi } from '@/utils/api/auth/logout.api';
import { useMutation } from '@tanstack/react-query';

export const useLogout = () => {
  // Use react-query's useMutation hook
  const logOutMutation = useMutation({
    mutationFn: async () => await logOutApi(),

    onSuccess: (data: any) => {
      // Handle success if needed
    },
    onError: (error: any) => {
      // Handle error if needed
    },
  });

  return logOutMutation;
};