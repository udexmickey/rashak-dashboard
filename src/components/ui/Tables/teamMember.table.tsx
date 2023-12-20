"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import NestedModal from "../modal";
import { BiEditAlt } from "react-icons/bi";
import { MdAutoDelete } from "react-icons/md";
import TeamMemberUpdateForm from "../Form/teamUpdate.form";
import DeleteConfirmationModal from "../confirmationUI/deleteAdminConfirmationModal";
import {
  useDeleteTeamMember,
  useFetchAllTeam,
} from "@/hooks/member/useMembersHook";
import { Pagination, Paper } from "@mui/material";
import MemberTable from "@/components/ui/Tables/Members.table";
import EmptyStateBox from "../placeholders/notification.placeholder";

export default function TeamMemberTable() {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [memberId, setMemberId] = useState<string>("");
  const {
    isLoading,
    data: teamMembersData,
    isError,
  } = useFetchAllTeam({
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
    clickedTeamMemberId: string
  ) => {
    if (optionName.toLowerCase() === "edit") {
      setModalType("edit");
      setOpenModal(true);
      setMemberId((prev) => (prev = clickedTeamMemberId));
    } else if (optionName.toLowerCase() === "remove") {
      setModalType("remove");
      setOpenModal(true);
      setMemberId((prev) => (prev = clickedTeamMemberId));
    } else {
      return;
    }
  };

  const teamMembersDatas =
    teamMembersData &&
    teamMembersData?.data?.find((member: any) => member?._id === memberId);

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage((prev) => (prev = newPage));
  };

  const headers = ["Name", "Role", "Date Added"];

  const {
    mutateAsync: deleteAdmin,
    isPending: deleteLoading,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = useDeleteTeamMember();

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
        {(!isError && teamMembersData?.data?.length) < 1 ? (
          <EmptyStateBox page={"Team Member"} />
        ) : (
          <>
            <MemberTable
              data={teamMembersData && teamMembersData?.data}
              options={options}
              handleOptionClick={handleOptionClick}
              headers={headers && headers}
              isLoading={isLoading}
              member="board"
            />

            <div className="flex justify-around items-end my-8 rounded-lg">
              <Pagination
                count={
                  teamMembersData &&
                  Math.ceil(teamMembersData?.totalItems / rowsPerPage)
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
              modalType === "edit" ? "Edit Team Member" : "Remove Team Member"
            }
            modalClassName={""}
          >
            {modalType === "edit" ? (
              <TeamMemberUpdateForm initialValues={teamMembersDatas as any} />
            ) : //Uncomment this when team member is available
            modalType === "remove" ? (
              <DeleteConfirmationModal
                adminId={memberId}
                title={"Team Member"}
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
