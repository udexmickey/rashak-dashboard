import { getOverviewCounts } from '@/utils/api/analytics/overview.api';
import { useQuery } from '@tanstack/react-query';

export function useOverviewCounts() {
  const Overview = useQuery({ queryKey: ['Overview'], queryFn: async () => await getOverviewCounts(), staleTime: 560000,
  })
  return Overview
}