"use client";

import { DeleteBlog, UpdateBlog, getAllSearchBlog, getOneBlog, postBlog } from "@/utils/api/blog/blog.api";
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
    queryKey: ["blogs", { searchText, pageNumber }],
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
        queryKey: ["blogs", { searchText: "", pageNumber: 1 }],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
    },
  });

  return postBlogMutation;
};

export const useUpdateOneBlog = (id: string) => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const UpdateBlogrMutation = useMutation({
    mutationFn: async (body: any) => await UpdateBlog(id, { ...body }),
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["blogs", { searchText: "", pageNumber: 1 }],
      });
      //This line helps invalidate that stored/catched queries for post with that id so on update the key also invalidates
      queryClient.invalidateQueries({
        queryKey: ["blog", id],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
      console.log("this is the cause of the error update", error);
    },
  });

  return UpdateBlogrMutation;
};

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
