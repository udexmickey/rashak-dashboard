
import { getActivityLog } from '@/utils/api/notification/notification.api';
import { useQuery } from '@tanstack/react-query';

export function useFetchNotification({ searchText, pageNumber, pageSize }: { searchText?: string | number | undefined; pageNumber: number; pageSize?: number }) {
  const activities = useQuery({ queryKey: ['notification', { searchText, pageNumber }], queryFn: async () => await getActivityLog({ pageNumber, searchText, pageSize }),
  })
  return activities
}