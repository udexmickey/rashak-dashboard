"use client";

import { ApprovePendingUser, DeletePendingUser } from "@/utils/api/admins/approval.user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useApprovePendingUser = () => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const approveUserMutation = useMutation({
    mutationFn: async (bodyId: string) => await ApprovePendingUser(bodyId),
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["users", { searchText: "", pageNumber: 1 }],
      });
      queryClient.invalidateQueries({
        queryKey: ["admins", { searchText: "", pageNumber: 1 }],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
      console.log('this is the cause of the error pending', error);
    },
  });

  return approveUserMutation;
};

export const useDeletePendingUser = () => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const deleteUserMutation = useMutation({
    mutationFn: async (bodyId: string) => await DeletePendingUser(bodyId),
    onSuccess: () => {
      // Invalidate and refetch andv Handle success if needed
      queryClient.invalidateQueries({
        queryKey: ["users", { searchText: "", pageNumber: 1 }],
      });
      queryClient.invalidateQueries({
        queryKey: ["admins", { searchText: "", pageNumber: 1 }],
      });
    },
    onError: (error: any) => {
      // Handle error if needed
      console.log('this is the cause of the error delete', error);
    },
  });

  return deleteUserMutation;
};