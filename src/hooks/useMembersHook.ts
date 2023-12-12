"use client";

import { getAllBoardMember, getOneBoardMember } from "@/utils/api/members/board";
import { getAllTeamMember, getOneTeamMember } from "@/utils/api/members/team";
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
    queryKey: ["board", { searchText, pageNumber }],
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

// export const usePostBoard = () => {
//   const queryClient = useQueryClient();

//   // Use react-query's useMutation hook
//   const postBoardMutation = useMutation({
//     mutationFn: async (body: any) => await postBoard(body), // TODO change the body type checking
//     onSuccess: () => {
//       // Invalidate and refetch andv Handle success if needed
//       queryClient.invalidateQueries({
//         queryKey: ["board", { searchText: "", pageNumber: 1 }],
//       });
//     },
//     onError: (error: any) => {
//       // Handle error if needed
//     },
//   });

//   return postBoardMutation;
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

export function useFetchOneteam(id: string) {
  const team = useQuery({
    queryKey: ["team", id],
    queryFn: async () => await getOneTeamMember(id),
    staleTime: 360000,
    enabled: !!id,
  });
  return team;
}