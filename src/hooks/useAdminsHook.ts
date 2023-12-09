"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllSearchAdmins, getOneAdmin } from "@/utils/api/admins/admins";
import { getAllSearchPendingUsers } from "@/utils/api/admins/pending-user";
import { getAllTeamMember, getOneTeamMember } from "@/utils/api/members/team";

export function useFetchAllAdmin({
  searchText,
  pageNumber,
  pageSize,
}: {
  searchText?: string | number | undefined;
  pageNumber: number;
  pageSize?: number;
}) {
  const fetchedData = useQuery({
    queryKey: ["admins", { searchText, pageNumber }],
    queryFn: async () =>
      await getAllSearchAdmins({ pageNumber, searchText, pageSize }),
    enabled: !!pageNumber,
    staleTime: 360000,
  });

  return fetchedData;
}

export function useFetchAllPendingUsers({
  searchText,
  pageNumber,
  pageSize,
}: {
  searchText?: string | number | undefined;
  pageNumber: number;
  pageSize?: number;
}) {
  const fetchedData = useQuery({
    queryKey: ["users", { searchText, pageNumber }],
    queryFn: async () =>
      await getAllSearchPendingUsers({ pageNumber, searchText, pageSize }),
    // enabled: !!pageNumber,
    // staleTime: 360000,
  });

  return fetchedData;
}

export function useFetchOneadmin(id: any) {
  const admin = useQuery({
    queryKey: ["admin", id],
    queryFn: async () => await getOneAdmin(id),
    staleTime: 360000,
    enabled: !!id,
  });
  return admin;
}

// export const usePostAdmin = () => {
//   const queryClient = useQueryClient();

//   // Use react-query's useMutation hook
//   const postAdminMutation = useMutation({
//     mutationFn: async (body: any) => await postAdmin(body),
//     onSuccess: () => {
//       // Invalidate and refetch andv Handle success if needed
//       queryClient.invalidateQueries({
//         queryKey: ["admin", { searchText: "", pageNumber: 1 }],
//       });
//     },
//     onError: (error: any) => {
//       // Handle error if needed
//     },
//   });

//   return postAdminMutation;
// };

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
    queryKey: ["team", { searchText, pageNumber }],
    queryFn: async () =>
      await getAllTeamMember({ pageNumber, searchText, pageSize }),
    enabled: !!pageNumber,
    staleTime: 360000,
  });

  return fetchedData;
}

export function useFetchOneteam(id: any) {
  const team = useQuery({
    queryKey: ["team", id],
    queryFn: async () => await getOneTeamMember(id),
    staleTime: 360000,
    enabled: !!id,
  });
  return team;
}