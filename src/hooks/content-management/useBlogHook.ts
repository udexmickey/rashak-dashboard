"use client";

import { DeleteBlog, getAllSearchBlog, getOneBlog, postBlog } from "@/utils/api/blog/blog.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFetchAllBlog({
  searchText,
  pageNumber,
  pageSize,
}: {
  searchText?: string | number | undefined;
  pageNumber: number;
  pageSize?: number;
}) {
  const fetchedData = useQuery({
    queryKey: ["blog", { searchText, pageNumber }],
    queryFn: async () =>
      await getAllSearchBlog({ pageNumber, searchText, pageSize }),
    enabled: !!pageNumber,
    staleTime: 360000,
    // keepPreviousData: true,
    // cacheTime: 30 * (60 * 1000), // 30 mins
  });

  return fetchedData;
}

export function useFetchOneblog(id: string) {
  const blog = useQuery({
    queryKey: ["blog", id],
    queryFn: async () => await getOneBlog(id),
    staleTime: 360000,
    enabled: !!id, //Only run this function if blogId is available
  });
  return blog;
}

export const usePostBlog = () => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const postBlogMutation = useMutation({
    mutationFn: async (body: any) => await postBlog(body), // TODO change the body type checking
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["blog", { searchText: "", pageNumber: 1 }],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
    },
  });

  return postBlogMutation;
};

export const useDeleteOneBlog = () => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const DeleteBlogrMutation = useMutation({
    mutationFn: async (blogId: string) => await DeleteBlog(blogId),
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["blog", { searchText: "", pageNumber: 1 }],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
      console.log("this is the cause of the error delete", error);
    },
  });

  return DeleteBlogrMutation;
};
