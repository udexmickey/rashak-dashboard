"use client";
import { useFetchAllPendingUsers } from "@/hooks/useAdminsHook";
import {
  useApprovePendingUser,
  useDeletePendingUser,
} from "@/hooks/useApproveHook";
import useIsMobile from "@/hooks/useIsMobile";
import { Alert, AlertTitle } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import IntegrationNotistack from "../alert/toast";

export default function AdminTable() {
  const { isMobile } = useIsMobile();
  const [modalType, setModalType] = useState("");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [memberId, setMemberId] = useState<string>("");
  const {
    isLoading,
    data: usermanagementData,
    isError,
  } = useFetchAllPendingUsers({
    searchText: "",
    pageNumber: page,
    pageSize: rowsPerPage,
  });

  const {
    isPending: isDeletingUser,
    isError: isErrorDeletingUser,
    mutateAsync: approveUserMutateAsync,
  } = useApprovePendingUser();

  const {
    isPending: isApprovingUser,
    isError: isErrorApprovingUser,
    mutateAsync: deleteUserMutateAsync,
  } = useDeletePendingUser();

  // const usermanagementData = [
  //   {
  //     id: "123",
  //     name: "Oladapo Koiki",
  //     email: "races@gmail.com",
  //     Department: "Communications",
  //   },
  //   {
  //     id: "223",
  //     name: "Abdulbasit Ibrahim",
  //     email: "gaza@gmail.com",
  //     Department: "IT",
  //   },
  //   {
  //     id: "323",
  //     name: "Ibrahim Sandra",
  //     email: "santo@gmail.com",
  //     Department: "IT",
  //   },
  //   {
  //     id: "423",
  //     name: "Barakat Tosin",
  //     email: "john@gmail.com",
  //     Department: "Communications",
  //   },
  // ];

  const handleAccept = async (id: string) => {
    // Add your logic to handle accept action here
    console.log(`Accepted: ${id}`);
    await approveUserMutateAsync(id);
  };

  const handleDelete = async (id: string) => {
    // Add your logic to handle delete action here
    console.log(`Deleted: ${id}`);
    await deleteUserMutateAsync(id);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert> */}
      <IntegrationNotistack />
      <br />
      <table className="text-sm text-left w-full">
        <tbody className="bg-white text-base text-[#1E1E1E] ">
          {usermanagementData &&
            usermanagementData?.data?.map((admin: any, idx: number) => (
              <tr className="bg-white text-lg border-b" key={admin?._id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap list-decimal max-w-max"
                >
                  <Link href={"#"}>
                    {idx + 1}. &nbsp; {isMobile && <span> &nbsp;</span>}{" "}
                    {admin?.name}
                  </Link>
                </th>
                <td
                  className="px-6 py-4 text-[#00A651]"
                  onClick={() => handleAccept(admin._id)}
                >
                  <div className="cursor-pointer hover:opacity-60 max-w-max">
                    Accept
                  </div>
                </td>
                <td
                  className="px-6 py-4 text-[#FF0000]"
                  onClick={() => handleDelete(admin._id)}
                >
                  <div className="cursor-pointer hover:opacity-60 max-w-max">
                    Delete
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
