import { resetpasswordApi } from "@/utils/api/auth/resetpassword.api";
import { useMutation } from '@tanstack/react-query';

export const useResetPassword = () => {
  // Use react-query's useMutation hook
  const resetpasswordMutation = useMutation({
    mutationFn: async (body: any) => await resetpasswordApi(body.token, body.newPassword),

    onSuccess: (data: any) => {
      // Handle success if needed
    },
    onError: (error: any) => {
      // Handle error if needed
    },
  });

  return resetpasswordMutation;
};