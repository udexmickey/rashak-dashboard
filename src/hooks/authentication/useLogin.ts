import { loginApi } from "@/utils/api/auth/login.api";
import { useMutation } from '@tanstack/react-query';

export const useLogin = () => {
  // Use react-query's useMutation hook
  const loginMutation = useMutation({
    mutationFn: async (body: any) => await loginApi(body.email, body.password),

    onSuccess: (data: any) => {
      // Handle success if needed
    },
    onError: (error: any) => {
      // Handle error if needed
    },
  });

  return loginMutation;
};