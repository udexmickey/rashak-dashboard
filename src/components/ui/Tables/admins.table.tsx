"use client";
import Link from "next/link";
import React, { useState } from "react";
import EditOptionMenu from "./table.options";
import NestedModal from "../modal";
import ConfirmationModal from "../confirmationUI/deleteAdminConfirmationModal";
import { usermanagementData } from "@/app/(dashboard)/user-management/usermanagementData.seed";
import { MdAssignmentAdd, MdAutoDelete } from "react-icons/md"
import DepartmentCard from "../cards/DepartmentCard";

export default function AdminTable() {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);
  const [modalType, setModalType] = useState("");

  const options = [
    {
    icon: MdAssignmentAdd,
    text: "Re-Assign",
    },
    {
    icon: MdAutoDelete,
    text: "Delete",
    },
];

  const handleOptionClick = (optionName: string, clickedAdminId: string) => {
    if (optionName.toLowerCase() === "re-assign") {
      setModalType("re-assign");
      setOpenModal(true);
    } else if (optionName.toLowerCase() === "delete") {
      setModalType("delete");
      setOpenModal(true);
      setModalContent(<ConfirmationModal />);
    } else {
      return;
    }
  };

  function handleReassign(adminId: string, selectedDepartment: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="text-sm text-left w-full">
        <thead className="text-sm text-gray-700 bg-white border-b uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Department
            </th>
            <th scope="col" className="px-6 py-3">
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="bg-white text-lg text-[#1E1E1E]">
          {/* <NestedModal /> */}
          {usermanagementData &&
            usermanagementData.map((admin, idx) => (
              <tr className="bg-white border-b" key={admin.name}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap list-decimal max-w-max"
                >
                  <Link href={`/user-management/${admin.id}`}>
                    {idx + 1}. &nbsp; {admin.name}
                  </Link>
                </th>
                <td className="px-6 py-4 text-[#1E1E1E]">{admin.email}</td>
                <td className="px-6 py-4 text-[#1E1E1E]">{admin.Department}</td>
                <td className="px-6 py-4 text-[#1E1E1E]">
                  {/* <EditOptionMenu
                    adminId={admin.id}
                    handleOptionClick={handleOptionClick}
                  /> */}
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
          title={modalType === "delete" ? "Delete Admin" : "Re-assign Admin"}
        >
          {modalType === "re-assign" ? (
          <DepartmentCard
              title="Re-Assign Admin Department"
              handleReassign={handleReassign}
              adminId={""}          />
        ) : null}
        {modalType === "delete" ? (
          <ConfirmationModal />
        ) : null}
        </NestedModal>
      )}
    </div>
  );
}
