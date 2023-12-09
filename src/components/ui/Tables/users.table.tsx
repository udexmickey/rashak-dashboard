"use client";
import { useFetchAllPendingUsers } from "@/hooks/useAdminsHook";
import {
  useApprovePendingUser,
  useDeletePendingUser,
} from "@/hooks/useApproveHook";
import useIsMobile from "@/hooks/useIsMobile";
import { Alert, AlertTitle, Paper } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CustomizedSnackbars } from "../alert/toast";

export default function AdminTable() {
  const { isMobile } = useIsMobile();
  const [messsage, setMesssage] = useState("");
  const [status, setStatus] = useState<
    "error" | "success" | "info" | "warning"
  >("info");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [open, setOpen] = useState<boolean>(false);
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
    isPending: isApprovingUser,
    isError: isErrorApprovingUser,
    mutateAsync: approveUserMutateAsync,
    error: isErrorApproved,
  } = useApprovePendingUser();

  const {
    isPending: isDeletingUser,
    isError: isErrorDeletingUser,
    mutateAsync: deleteUserMutateAsync,
    error: isErrorDeleted,
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

  const hasApproved = (opne: boolean) => {
    setOpen((prev) => !prev);
  };

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

  useEffect(() => {
    if (isApprovingUser) {
      setOpen((prev) => !prev);
      setMesssage("User Approved");
      setStatus("success");
    }
    if (isDeletingUser) {
      setOpen((prev) => !prev);
      setMesssage("User Deleted");
      setStatus("warning");
    }
    if (isErrorApprovingUser) {
      setOpen((prev) => !prev);
      setMesssage(isErrorApproved?.message);
      setStatus("error");
    }
    if (isErrorDeletingUser) {
      setOpen((prev) => !prev);
      setMesssage(isErrorDeleted?.message);
      setStatus("error");
    }
  }, [
    isApprovingUser,
    isDeletingUser,
    isErrorApproved,
    isErrorApprovingUser,
    isErrorDeleted,
    isErrorDeletingUser,
  ]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert> */}
      {/* <TransitionAlerts open={open} setOpen={hasApproved} /> */}
      <CustomizedSnackbars
        open={open}
        setOpen={hasApproved}
        message={messsage}
        status={status}
      />
      <br />
      <Paper
        elevation={3}
        style={{ maxHeight: "70dvh", overflowY: "auto", height: "100dvh" }}
        className="flex flex-col justify-between items-around bg-white"
      >
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
                    <div
                      className={`cursor-pointer hover:opacity-60 max-w-max ${
                        isApprovingUser && "opacity-90"
                      }`}
                    >
                      Accept
                    </div>
                  </td>
                  <td
                    className="px-6 py-4 text-[#FF0000]"
                    onClick={() => handleDelete(admin._id)}
                  >
                    <div
                      className={`cursor-pointer hover:opacity-60 max-w-max ${
                        isDeletingUser && "opacity-90"
                      }`}
                    >
                      Delete
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        {isError ||
          isErrorApprovingUser ||
          (isErrorDeletingUser && (
            <p>
              Login Error: {` `}
              <span className="text-[#ff0000]">
                {` `} {"An error occurred"}
              </span>
            </p>
          ))}
        {isApprovingUser ||
          isDeletingUser ||
          (isLoading && (
            <p>
              <span className="text-[#f1c557]">{` `} Please wait...</span>
            </p>
          ))}
      </Paper>
    </div>
  );
}
