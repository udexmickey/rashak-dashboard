'use client';

import { getAllSearchBlogs, getOneBlog } from '@/utils/api/blog/blog';
import { useQuery } from '@tanstack/react-query';

export function useFetchAllBlogs({ searchText, pageNumber, pageSize }: { searchText?: string | number | undefined; pageNumber: number; pageSize?: number }) {
  const fetchedData = useQuery({
    queryKey: ['blogs', { searchText, pageNumber }],
    queryFn: async () => await getAllSearchBlogs({ pageNumber, searchText, pageSize }),
  });

  return fetchedData;
}

//Fetch single blog
export function useFetchOneblog(id: any) {
  const blogs = useQuery({ queryKey: ['blog', id], queryFn: async () => await getOneBlog(id)})
  return blogs
}