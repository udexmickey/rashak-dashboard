"use client";
import React, { ChangeEvent, useState } from "react";
import NestedModal from "../modal";
import { BiEditAlt } from "react-icons/bi";
import { MdAutoDelete } from "react-icons/md";
import BoardMemberUpdateForm from "../Form/boardUpdate.form";
import DeleteConfirmationModal from "../confirmationUI/deleteAdminConfirmationModal";
import { useFetchAllBoard } from "@/hooks/useMembersHook";
import { Pagination, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
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

  // Handler for updating the board member
  const handleUpdate = (formData: FormData) => {
    // Perform the update logic with the formData
    console.log("Updating board member with data:", formData);
  };

  const router = useRouter();

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage((prev) => (prev = newPage));
  };

  const headers = ["Name", "Role", "Date Added"];

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
            handleClose={() => setOpenModal(false)}
            title={
              modalType === "edit" ? "Edit Board Member" : "Remove Board Member"
            }
            modalClassName={""}
          >
            {modalType === "edit" ? (
              <BoardMemberUpdateForm
                initialValues={boardMembersDatas as any}
                handleUpdate={handleUpdate}
              />
            ) : null}
            {/* {modalType === "remove" ? <DeleteConfirmationModal adminId={""} handleClose={function (): void {
              throw new Error("Function not implemented.");
            } } handleConfirm={function (): void {
              throw new Error("Function not implemented.");
            } } /> : null} */}
          </NestedModal>
        )}
      </Paper>
    </div>
  );
}
