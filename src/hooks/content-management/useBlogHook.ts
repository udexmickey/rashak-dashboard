'use client';

import { DeleteBlog, getAllSearchBlogs, getOneBlog } from '@/utils/api/blog/blog';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFetchAllBlogs({ searchText, pageNumber, pageSize }: { searchText?: string | number | undefined; pageNumber: number; pageSize?: number }) {
  const fetchedData = useQuery({
    queryKey: ['blogs', { searchText, pageNumber }],
    queryFn: async () => await getAllSearchBlogs({ pageNumber, searchText, pageSize }),
  });

  return fetchedData;
}

//Fetch single blog
export function useFetchOneblog(id: string) {
  const blogs = useQuery({ queryKey: ['blog', id], queryFn: async () => await getOneBlog(id)})
  return blogs
}

export const useDeleteOneBlog = () => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const DeleteBlogrMutation = useMutation({
    mutationFn: async (blogId: string) => await DeleteBlog(blogId),
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["blogs", { searchText: "", pageNumber: 1 }],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
      console.log("this is the cause of the error delete", error);
    },
  });

  return DeleteBlogrMutation;
};