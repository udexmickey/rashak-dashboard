"use client";
import Link from "next/link";
import React, { useState } from "react";
import EditOptionMenu from "./table.options";
import NestedModal from "../modal";
import { BiEditAlt } from "react-icons/bi";
import { MdAutoDelete } from "react-icons/md";
import { teamMembersData } from "@/app/(dashboard)/members/seed";
import TeamMemberUpdateForm from "../Form/teamUpdate.form";
import DeleteConfirmationModal from "../confirmationUI/deleteAdminConfirmationModal";

export default function TeamMemberTable() {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");

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
      console.log("me and edit");
    } else if (optionName.toLowerCase() === "remove") {
      setModalType("remove");
      setOpenModal(true);
      console.log("remove you");
    } else {
      return;
    }
  };

const teamMembersDatas = teamMembersData && teamMembersData.find((member) => member.id === '1')

   // Handler for updating the team member
   const handleUpdate = (formData: FormData) => {
    // Perform the update logic with the formData
    console.log("Updating team member with data:", formData);
  };

  return (
    <div className="relative overflow-x-auto sm:rounded-lg">
      <table className="text-sm text-left w-full">
        <thead className="text-sm text-gray-700 bg-white border-b uppercase">
          <tr>
            <th scope="col" className="px-6 py-8 text-base">
              Name
            </th>
            <th scope="col" className=" py-8 text-base">
              Role
            </th>
            <th scope="col" className="px-6 py-8 text-base">
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="bg-white text-lg text-[#1E1E1E]">
          {teamMembersData &&
            teamMembersData.map((admin, idx) => (
              <tr className="bg-white border-b" key={admin.name}>
                <th
                  scope="row"
                  className="px-6 py-3 font-medium whitespace-nowrap list-decimal max-w-max"
                >
                  {idx + 1}. &nbsp; {admin.name}
                </th>
                <td>{admin.role}</td>
                <td className="px-6 py-3 text-[#1E1E1E]">
                  <EditOptionMenu
                    adminId={admin.id}
                    options={options}
                    handleOptionClick={handleOptionClick}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {openModal && (
        <NestedModal
          handleClose={() => setOpenModal(false)}
          title={modalType === "edit" ? "Edit Team Member" : "Remove Team Member"}
        >
          {modalType === "edit" ? 
          <TeamMemberUpdateForm initialValues={teamMembersDatas as any} handleUpdate={handleUpdate} />
          : null}
          {modalType === "remove" ?  <DeleteConfirmationModal /> : null}
        </NestedModal>
      )}
    </div>
  );
}