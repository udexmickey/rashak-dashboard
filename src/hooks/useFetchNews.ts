'use client';

import { getAllSearchNews, getOneNews } from '@/utils/api/news/news';
import { useQuery } from '@tanstack/react-query';

export function useFetchAllNews({ searchText, pageNumber, pageSize }: { searchText?: string | number | undefined; pageNumber: number; pageSize?: number }) {
  const fetchedData = useQuery({
    queryKey: ['news', { searchText, pageNumber }],
    queryFn: async () => await getAllSearchNews({ pageNumber, searchText, pageSize }),
  });

  return fetchedData;
}


export function useFetchOnenews(id: any) {
  const news = useQuery({ queryKey: ['news', id], queryFn: async () => await getOneNews(id)})
  return news
}