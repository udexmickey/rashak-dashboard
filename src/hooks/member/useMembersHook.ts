"use client";

import { getAllBoardMember, getOneBoardMember, addBoardMember, DeleteBoardMember, UpdateBoardMember } from "@/utils/api/members/board.api";
import { DeleteTeamMember, UpdateTeamMember, addTeamMember, getAllTeamMember, getOneTeamMember } from "@/utils/api/members/team.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useFetchAllBoard({
  searchText,
  pageNumber,
  pageSize,
}: {
  searchText?: string | number | undefined;
  pageNumber: number;
  pageSize?: number;
}) {
  const fetchedData = useQuery({
    queryKey: ["boards", { searchText, pageNumber }],
    queryFn: async () =>
      await getAllBoardMember({ pageNumber, searchText, pageSize }),
    enabled: !!pageNumber,
    staleTime: 360000,
  });

  return fetchedData;
}

export function useFetchOneboard(id: string) {
  const board = useQuery({
    queryKey: ["board", id],
    queryFn: async () => await getOneBoardMember(id),
    staleTime: 360000,
    enabled: !!id,
  });
  return board;
}

export const usePostBoardMember = () => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const postBoardMutation = useMutation({
    mutationFn: async (body: Record<string, any> ) =>{
      return await addBoardMember({ ...body })
    },
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["boards", { pageNumber: 1, searchText: "" }],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
    },
  });

  return postBoardMutation;
};

export const useUpdateOneBoard = (id: string) => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const UpdateBoardrMutation = useMutation({
    mutationFn: async (body: any) => await UpdateBoardMember(id, { ...body }),
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["boards", { searchText: "", pageNumber: 1 }],
      });
      //This line helps invalidate that stored/catched queries for post with that id so on update the key also invalidates
      queryClient.invalidateQueries({
        queryKey: ["board", id],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
      console.log("this is the cause of the error update", error);
    },
  });

  return UpdateBoardrMutation;
};

export const useDeleteBoardMember = () => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const DeleteBoardMemberrMutation = useMutation({
    mutationFn: async (body: Record<string, any>) => await DeleteBoardMember(body.id),
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["board", { searchText: "", pageNumber: 1 }],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
      console.log("this is the cause of the error delete", error);
    },
  });

  return DeleteBoardMemberrMutation;
};


///Team members
export function useFetchAllTeam({
  searchText,
  pageNumber,
  pageSize,
}: {
  searchText?: string | number | undefined;
  pageNumber: number;
  pageSize?: number;
}) {
  const fetchedData = useQuery({
    queryKey: ["teams", { searchText, pageNumber }],
    queryFn: async () =>
      await getAllTeamMember({ pageNumber, searchText, pageSize }),
    enabled: !!pageNumber,
    staleTime: 360000,
  });

  return fetchedData;
}

export function useFetchOneteam(id: string) {
  const team = useQuery({
    queryKey: ["team", id],
    queryFn: async () => await getOneTeamMember(id),
    staleTime: 360000,
    enabled: !!id,
  });
  return team;
}

export const usePostTeamMember = () => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const postTeamMutation = useMutation({
    mutationFn: async (body: Record<string, any> ) =>{
      return await addTeamMember({ ...body })
    },
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["teams", { pageNumber: 1, searchText: "" }],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
    },
  });

  return postTeamMutation;
};

export const useUpdateOneTeam = (id: string) => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const UpdateTeamrMutation = useMutation({
    mutationFn: async (body: any) => await UpdateTeamMember(id, { ...body }),
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["teams", { searchText: "", pageNumber: 1 }],
      });
      //This line helps invalidate that stored/catched queries for post with that id so on update the key also invalidates
      queryClient.invalidateQueries({
        queryKey: ["team", id],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
      console.log("this is the cause of the error update", error);
    },
  });

  return UpdateTeamrMutation;
};

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const DeleteTeamMemberrMutation = useMutation({
    mutationFn: async (body: Record<string, any>) => await DeleteTeamMember(body.id),
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["teams", { searchText: "", pageNumber: 1 }],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
      console.log("this is the cause of the error delete", error);
    },
  });

  return DeleteTeamMemberrMutation;
};