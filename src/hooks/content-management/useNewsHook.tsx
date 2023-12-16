"use client";

import {
  DeleteNews,
  UpdateNews,
  getAllSearchNews,
  getOneNews,
  postNews,
} from "@/utils/api/news/news.api";
import { NewsDataType } from "@/utils/types/news.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFetchAllNews({
  searchText,
  pageNumber,
  pageSize,
}: {
  searchText?: string | number | undefined;
  pageNumber: number;
  pageSize?: number;
}) {
  const fetchedData = useQuery({
    queryKey: ["news", { searchText, pageNumber }],
    queryFn: async () =>
      await getAllSearchNews({ pageNumber, searchText, pageSize }),
    enabled: !!pageNumber,
    staleTime: 360000,
    // keepPreviousData: true,
    // cacheTime: 30 * (60 * 1000), // 30 mins
  });

  return fetchedData;
}

export function useFetchOnenews(id: string) {
  const news = useQuery({
    queryKey: ["news", id],
    queryFn: async () => await getOneNews(id),
    staleTime: 360000,
    enabled: !!id, //Only run this function if newsId is available
  });
  return news;
}

export const usePostNews = () => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const postNewsMutation = useMutation({
    mutationFn: async (body: any) => await postNews(body), // TODO change the body type checking
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["news", { searchText: "", pageNumber: 1 }],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
    },
  });

  return postNewsMutation;
};

export const useUpdateOneNews = (id: string) => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const UpdateNewsrMutation = useMutation({
    mutationFn: async (body: any) => await UpdateNews(id, { ...body }),
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["news", { searchText: "", pageNumber: 1 }],
      });
      //This line helps invalidate that stored/catched queries for post with that id so on update the key also invalidates
      queryClient.invalidateQueries({
        queryKey: ["news", id],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
      console.log("this is the cause of the error update", error);
    },
  });

  return UpdateNewsrMutation;
};

export const useDeleteOneNews = () => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const DeleteNewsrMutation = useMutation({
    mutationFn: async (newsId: string) => await DeleteNews(newsId),
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["news", { searchText: "", pageNumber: 1 }],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
      console.log("this is the cause of the error delete", error);
    },
  });

  return DeleteNewsrMutation;
};
