"use client";

import { ReassignDepartment } from "@/utils/api/admins/department.admin";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useReassignDepartment = () => {
  const queryClient = useQueryClient();

  // Use react-query's useMutation hook
  const ReassignDepartmentMutation = useMutation({
    mutationFn: async (body: any) =>
      await ReassignDepartment(body.id, body.department),
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
      console.log("this is the cause of the error pending", error);
    },
  });

  return ReassignDepartmentMutation;
};
