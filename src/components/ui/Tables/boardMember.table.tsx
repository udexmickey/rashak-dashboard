"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import NestedModal from "../modal";
import { BiEditAlt } from "react-icons/bi";
import { MdAutoDelete } from "react-icons/md";
import BoardMemberUpdateForm from "../Form/boardUpdate.form";
import DeleteConfirmationModal from "../confirmationUI/deleteAdminConfirmationModal";
import {
  useDeleteBoardMember,
  useFetchAllBoard,
} from "@/hooks/member/useMembersHook";
import { Pagination, Paper } from "@mui/material";
import MemberTable from "@/components/ui/Tables/Members.table";
import EmptyStateBox from "../placeholders/notification.placeholder";

export default function BoardMemberTable() {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [memberId, setMemberId] = useState<string>("");
  const {
    isLoading,
    data: boardMembersData,
    isError,
  } = useFetchAllBoard({
    searchText: "",
    pageNumber: page,
    pageSize: rowsPerPage,
  });

  const options = [
    {
      icon: BiEditAlt,
      text: "Edit",
    },
    {
      icon: MdAutoDelete,
      text: "Remove",
    },
  ];

  const handleOptionClick = (
    optionName: string,
    clickedBoardMemberId: string
  ) => {
    if (optionName.toLowerCase() === "edit") {
      setModalType("edit");
      setOpenModal(true);
      setMemberId((prev) => (prev = clickedBoardMemberId));
    } else if (optionName.toLowerCase() === "remove") {
      setModalType("remove");
      setOpenModal(true);
      setMemberId((prev) => (prev = clickedBoardMemberId));
    } else {
      return;
    }
  };

  const boardMembersDatas =
    boardMembersData &&
    boardMembersData?.data?.find((member: any) => member?._id === memberId);

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage((prev) => (prev = newPage));
  };

  const headers = ["Name", "Role", "Date Added"];

  const {
    mutateAsync: deleteAdmin,
    isPending: deleteLoading,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = useDeleteBoardMember();

  const handleConfirmDeleteAdmin = async () => {
    const body = {
      id: memberId,
    };

    await deleteAdmin(body);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    deleteSuccess && handleClose();
  }, [deleteSuccess]);

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <Paper
        elevation={3}
        style={{ maxHeight: "64dvh", overflowY: "auto", height: "100dvh" }}
        className="flex flex-col justify-between items-around"
      >
        {(!isError && boardMembersData?.data?.length) < 1 ? (
          <EmptyStateBox page={"Board Member"} />
        ) : (
          <>
            <MemberTable
              data={boardMembersData && boardMembersData?.data}
              options={options}
              handleOptionClick={handleOptionClick}
              headers={headers && headers}
              isLoading={isLoading}
              member="board"
            />

            <div className="flex justify-around items-end my-8 rounded-lg">
              <Pagination
                count={
                  boardMembersData &&
                  Math.ceil(boardMembersData?.totalItems / rowsPerPage)
                }
                onChange={handleChangePage}
                page={page}
                siblingCount={0}
                boundaryCount={2}
              />
            </div>
          </>
        )}

        {openModal && (
          <NestedModal
            handleClose={handleClose}
            title={
              modalType === "edit" ? "Edit Board Member" : "Remove Board Member"
            }
            modalClassName={""}
          >
            {modalType === "edit" ? (
              <BoardMemberUpdateForm initialValues={boardMembersDatas as any} />
            ) : //Uncomment this when board member is available
            modalType === "remove" ? (
              <DeleteConfirmationModal
                adminId={memberId}
                title={"Board Member"}
                handleClose={handleClose}
                handleConfirm={handleConfirmDeleteAdmin}
              />
            ) : null}
          </NestedModal>
        )}
      </Paper>
    </div>
  );
}
