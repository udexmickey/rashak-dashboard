"use client";
import React, { ChangeEvent, useState } from "react";
import NestedModal from "../modal";
import { BiEditAlt } from "react-icons/bi";
import { MdAutoDelete } from "react-icons/md";
import TeamMemberUpdateForm from "../Form/teamUpdate.form";
import DeleteConfirmationModal from "../confirmationUI/deleteAdminConfirmationModal";
import { useFetchAllTeam } from "@/hooks/useMembersHook";
import { Pagination, Paper } from "@mui/material";
import { useRouter } from "next/navigation";
import MemberTable from "@/components/ui/Tables/Members.table";

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

  // Handler for updating the team member
  const handleUpdate = (formData: FormData) => {
    // Perform the update logic with the formData
    console.log("Updating team member with data:", formData);
  };

  const router = useRouter();

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage((prev) => (prev = newPage));
  };

  const headers = ["Name", "Role", "Linkedin", "Date Created"];

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <Paper
        elevation={3}
        style={{ maxHeight: "70dvh", overflowY: "auto", height: "100dvh" }}
        className="flex flex-col justify-between items-around"
      >
        {!isError && (
          <>
            <MemberTable
              data={teamMembersData && teamMembersData?.data}
              options={options}
              handleOptionClick={handleOptionClick}
              headers={headers && headers}
              isLoading={isLoading}
              member="team"
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
            handleClose={() => setOpenModal(false)}
            title={
              modalType === "edit" ? "Edit Team Member" : "Remove Team Member"
            }
            modalClassName={""}
          >
            {modalType === "edit" ? (
              <TeamMemberUpdateForm
                initialValues={teamMembersDatas as any}
                handleUpdate={handleUpdate}
              />
            ) : modalType === "remove" ? (
              <DeleteConfirmationModal />
            ) : null}
          </NestedModal>
        )}
      </Paper>
    </div>
  );
}
