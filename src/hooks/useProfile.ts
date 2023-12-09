import { getProfile } from '@/utils/api/profile/profile';
import { useQuery } from '@tanstack/react-query';

export function useFetchOneprofile() {
  const profile = useQuery({ queryKey: ['profile'], queryFn: async () => await getProfile(), staleTime: 560000,
  })
  return profile
}