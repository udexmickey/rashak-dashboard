"use client";

import { getAllSearchStory, getOneStory, postStory, DeleteStory, UpdateStory } from "@/utils/api/story/story.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFetchAllStory({
  searchText,
  pageNumber,
  pageSize,
}: {
  searchText?: string | number | undefined;
  pageNumber: number;
  pageSize?: number;
}) {
  const fetchedData = useQuery({
    queryKey: ["stories", { searchText, pageNumber }],
    queryFn: async () =>
      await getAllSearchStory({ pageNumber, searchText, pageSize }),
    enabled: !!pageNumber,
    staleTime: 360000,
    // keepPreviousData: true,
    // cacheTime: 30 * (60 * 1000), // 30 mins
  });

  return fetchedData;
}

export function useFetchOnestory(id: string) {
  const story = useQuery({
    queryKey: ["story", id],
    queryFn: async () => await getOneStory(id),
    staleTime: 360000,
    enabled: !!id, //Only run this function if storyId is available
  });
  return story;
}

export const usePostStory = () => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const postStoryMutation = useMutation({
    mutationFn: async (body: any) => await postStory(body), // TODO change the body type checking
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["stories", { searchText: "", pageNumber: 1 }],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
    },
  });

  return postStoryMutation;
};

export const useUpdateOneStory = (id: string) => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const UpdateStoryrMutation = useMutation({
    mutationFn: async (body: any) => await UpdateStory(id, { ...body }),
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["stories", { searchText: "", pageNumber: 1 }],
      });
      //This line helps invalidate that stored/catched queries for post with that id so on update the key also invalidates
      queryClient.invalidateQueries({
        queryKey: ["story", id],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
      console.log("this is the cause of the error update", error);
    },
  });

  return UpdateStoryrMutation;
};

export const useDeleteOneStory = () => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const DeleteStoryrMutation = useMutation({
    mutationFn: async (storyId: string) => await DeleteStory(storyId),
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["stories", { searchText: "", pageNumber: 1 }],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
      console.log("this is the cause of the error delete", error);
    },
  });

  return DeleteStoryrMutation;
};
