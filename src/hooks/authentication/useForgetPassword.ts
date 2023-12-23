import { forgetpasswordApi } from "@/utils/api/auth/forgetpassword.api";
import { useMutation } from '@tanstack/react-query';

export const useForgetPassword = () => {
  // Use react-query's useMutation hook
  const forgetpasswordMutation = useMutation({
    mutationFn: async (email: string) => await forgetpasswordApi(email),

    onSuccess: (data: any) => {
      // Handle success if needed
    },
    onError: (error: any) => {
      // Handle error if needed
    },
  });

  return forgetpasswordMutation;
};