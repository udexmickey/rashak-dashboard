"use client";
import Link from "next/link";
import React, { ChangeEvent, useEffect, useState } from "react";
import EditOptionMenu from "./table.options";
import NestedModal from "../modal";
import DeleteConfirmationModal from "../confirmationUI/deleteAdminConfirmationModal";
// import { usermanagementData } from "@/app/(dashboard)/user-management/usermanagementData.seed";
import { MdAssignmentAdd, MdAutoDelete } from "react-icons/md";
import DepartmentCard from "../cards/DepartmentCard";
import { useDeleteAdmin, useFetchAllAdmin } from "@/hooks/useAdminsHook";
import { Pagination, Paper } from "@mui/material";
import EmptyStateBox from "../placeholders/notification.placeholder";
import { useReassignDepartment } from "@/hooks/useDepartment";

export default function AdminTable() {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<any>(null);
  const [modalType, setModalType] = useState("");
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [adminId, setAdminId] = useState<string>("");
  // const [department, setDepartdepartment] = useState<string>("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const {
    isLoading,
    data: usermanagementData,
    isError,
  } = useFetchAllAdmin({
    searchText: "",
    pageNumber: page,
    pageSize: rowsPerPage,
  });

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

  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const handleOptionClick = (optionName: string, clickedAdminId: string) => {
    if (optionName.toLowerCase() === "re-assign") {
      setAdminId(clickedAdminId);
      setModalType("re-assign");
      setOpenModal(true);
    } else if (optionName.toLowerCase() === "delete") {
      setModalType("delete");
      setOpenModal(true);
      // setModalContent(<DeleteConfirmationModal />);
      setAdminId(clickedAdminId);
    } else {
      return;
    }
  };

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage((prev) => (prev = newPage));
  };

  const {
    mutateAsync: ReassignAdmin,
    isPending: ReassignLoading,
    isError: ReassignError,
    isSuccess: ReassignSuccess,
  } = useReassignDepartment();

  const handleConfirmReassignAdmin = async () => {
    const body = {
      id: adminId,
      department: selectedDepartment,
    };

    await ReassignAdmin(body);
  };

  const {
    mutateAsync: deleteAdmin,
    isPending: deleteLoading,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = useDeleteAdmin();

  const handleConfirmDeleteAdmin = async () => {
    const body = {
      id: adminId,
    };

    console.log("Delete Admin", body);

    await deleteAdmin(body);
  };

  //close modal when request is successful
  useEffect(() => {
    (ReassignSuccess || deleteSuccess) && setOpenModal(false);
  }, [ReassignSuccess, deleteSuccess]);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Paper
        elevation={3}
        style={{ maxHeight: "70dvh", overflowY: "auto", height: "100dvh" }}
        className="flex flex-col justify-between items-around"
      >
        {(usermanagementData && usermanagementData?.data?.length) < 1 ? (
          <EmptyStateBox page={"Admin"} />
        ) : (
          <>
            <table className="text-sm text-left w-full">
              <thead className="text-sm text-gray-700 bg-white border-b uppercase">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  {/* <th scope="col" className="px-6 py-3">
              Email
            </th> */}
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
                  usermanagementData.data.map((admin: any, idx: number) => (
                    <tr className="bg-white border-b" key={admin._id}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium whitespace-nowrap list-decimal max-w-max"
                      >
                        <Link href={`/user-management/${admin?._id}`}>
                          <div className="flex items-center px-0 whitespace-nowrap ">
                            <div className="ps-3">
                              <div className="text-base font-semibold">
                                {`${admin?.name?.slice(0, 25)} ${
                                  (admin?.name as string).length >
                                  (admin?.name as string).slice(0, 22)?.length
                                    ? "..."
                                    : ""
                                }`}
                              </div>
                              <div className="font-normal text-gray-500">
                                {admin?.email || ""}
                              </div>
                            </div>
                          </div>
                        </Link>
                      </th>
                      {/* <td className="px-6 py-4 text-[#1E1E1E]">{admin.email}</td> */}
                      <td className="px-6 py-4 text-[#1E1E1E]">
                        {admin.department}
                      </td>
                      <td className="px-6 py-4 text-[#1E1E1E]">
                        <EditOptionMenu
                          adminId={admin._id}
                          options={options}
                          handleOptionClick={handleOptionClick}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="flex justify-around items-end my-8 rounded-lg bg-white">
              <Pagination
                count={
                  usermanagementData &&
                  Math.ceil(usermanagementData?.totalItems / rowsPerPage)
                }
                onChange={handleChangePage}
                page={page}
                siblingCount={0}
                boundaryCount={2}
              />
            </div>
          </>
        )}
      </Paper>
      {openModal && (
        <NestedModal
          handleClose={() => setOpenModal(false)}
          title={modalType === "delete" ? "Delete Admin" : "Re-assign Admin"}
        >
          {modalType === "re-assign" ? (
            <DepartmentCard
              title="Re-Assign Admin Department"
              handleReassign={handleConfirmReassignAdmin}
              adminId={adminId}
              handleConfirm={handleConfirmReassignAdmin}
              selectedDepartment={selectedDepartment}
              setSelectedDepartment={setSelectedDepartment} // department={department}
            />
          ) : null}
          {modalType === "delete" ? (
            <DeleteConfirmationModal
              adminId={adminId}
              // selectedDepartment={selectedDepartment}
              handleClose={() => setOpenModal(false)}
              handleConfirm={handleConfirmDeleteAdmin}
            />
          ) : null}
        </NestedModal>
      )}
    </div>
  );
}
