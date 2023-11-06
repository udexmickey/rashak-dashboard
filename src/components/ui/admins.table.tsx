'use client'
import Link from "next/link";
import React, { useState } from "react";
import EditOptionMenu from "./table.options";
import NestedModal from "./modal";
import ConfirmationModal from "./confirmation";

export default function AdminTable() {
  const dataArray = [
    {
      id: "123",
      title: "Oladapo Koiki",
      email: "races@gmail.com",
      Department: "Communications",
    },
    {
      id: "223",
      title: "Abdulbasit Ibrahim",
      email: "gaza@gmail.com",
      Department: "IT",
    },
    {
      id: "323",
      title: "Ibrahim Sandra",
      email: "santo@gmail.com",
      Department: "IT",
    },
    {
      id: "423",
      title: "Barakat Tosin",
      email: "john@gmail.com",
      Department: "Communications",
    },
  ];

  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);
  const [modalType, setModalType] = useState("");

  const handleOptionClick = (optionName: string, clickedAdminId: string) => {
    if (optionName.toLowerCase() === "re-assign") {
      setModalType("re-assign");
      setOpenModal(true);
    } else if (optionName.toLowerCase() === "delete") {
      setModalType("delete");
      setOpenModal(true);
      setModalContent(<ConfirmationModal />)
    } else {
      return;
    }
  };
  

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
          {dataArray &&
            dataArray.map((admin, idx) => (
              <tr className="bg-white border-b" key={admin.title}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap list-decimal max-w-max"
                >
                  <Link href={"#"}>
                  {idx + 1}. &nbsp; {window.innerWidth >= 768 &&  <span> &nbsp;</span> } {admin.title}
                  </Link>
                </th>
                <td
                  className="px-6 py-4 text-[#1E1E1E]"
                >
                  {admin.email}
                </td>
                <td
                  className="px-6 py-4 text-[#1E1E1E]"
                >
                  {admin.Department}
                </td>
                <td className="px-6 py-4 text-[#1E1E1E]">
                  {/* <EditOptionMenu /> */}
                  {/* {openModal && (
  // <NestedModal
  //   modalName={modalType}
  //   // handleClose={() => setOpenModal(false)}
  // />
)} */}
                  <EditOptionMenu
                    adminId={admin.id}
                    handleOptionClick={handleOptionClick}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      {openModal && (
        <NestedModal
          modalName={modalType}
          handleClose={() => setOpenModal(false)}
        >
            <ConfirmationModal />
        </NestedModal>
      )}
    </div>
  );
}
