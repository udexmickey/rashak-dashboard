import { changepasswordApi, getProfile } from '@/utils/api/profile/profile.api';
import { ChangePasswordRequest } from '@/utils/types/profile.type';
import { useMutation, useQuery } from '@tanstack/react-query';

export function useFetchOneprofile() {
  const profile = useQuery({ queryKey: ['profile'], queryFn: async () => await getProfile(), staleTime: 560000,
  })
  return profile
}

export const useChangePassword = () => {
  // Use react-query's useMutation hook
  const changepasswordMutation = useMutation({
    mutationFn: async (changePassword: ChangePasswordRequest) => await changepasswordApi({ ...changePassword}),

    onSuccess: (data: any) => {
      // Handle success if needed
    },
    onError: (error: any) => {
      // Handle error if needed
    },
  });

  return changepasswordMutation;
};