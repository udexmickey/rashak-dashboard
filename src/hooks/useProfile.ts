import { getProfile } from '@/utils/api/profile/profile.api';
import { useQuery } from '@tanstack/react-query';

export function useFetchOneprofile() {
  const profile = useQuery({ queryKey: ['profile'], queryFn: async () => await getProfile(), staleTime: 560000,
  })
  return profile
}