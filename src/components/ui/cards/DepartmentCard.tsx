"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { MdComputer, MdPhone } from "react-icons/md";
import { FormControl, FormLabel, RadioGroup } from "@mui/material";
import AssignedConfirmModal from "../confirmationUI/confirm.assign.modal";

interface DepartmentCardProps {
  title: string;
  // department: string;
  adminId: string;
  handleReassign: (adminId: string, selectedDepartment: string) => void;
  handleConfirm: () => void;
  selectedDepartment: string;
  setSelectedDepartment: (event: any) => void;
  // showConfirmationModal: boolean;
  // setShowConfirmationModal: (prev: boolean) => void;
  // handleNestedClose: () => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({
  title,
  // department,
  adminId,
  handleReassign,
  handleConfirm,
  selectedDepartment,
  setSelectedDepartment,
}) => {
  // const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const handleAssignClick = () => {
    selectedDepartment !== "" && setShowConfirmationModal(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDepartment((event.target as HTMLInputElement).value);
  };

  const handleMenuItemClick = (text: string) => {
    // Call the callback function passed as a prop with the selected option text and adminId
    handleReassign(adminId, selectedDepartment);

    // Close the menu
    // handleClose();
  };

  return (
    <>
      <FormControl
        style={{
          color: "#484848",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="flex justify-center items-center gap-y-12"
      >
        <FormLabel
          id="demo-customized-radios"
          className="text-lg font-medium place-self-start"
        >
          {title}
        </FormLabel>
        <RadioGroup
          defaultValue=""
          aria-labelledby="demo-customized-radios"
          name="customized-radios"
          // className="grid w-full gap-6 md:grid-cols-2"
          value={selectedDepartment}
          onChange={handleChange}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
            width: "100%",
          }}
        >
          <div>
            <input
              type="radio"
              id="hosting-small"
              name="hosting"
              className="hidden peer"
              onChange={(e) => setSelectedDepartment(e.target.value)}
              value={"IT"}
            />

            <label
              htmlFor="hosting-small"
              className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-[#FFE8D9] border border-gray-200 rounded-lg cursor-pointer peer-checked:text-[#484848] hover:text-gray-600 hover:bg-gray-100 peer-checked:ring-[#00A651] box-border peer-checked:border-[#00A651] peer-checked:bg-[#C7FFE2] h-24"
            >
              <div className="block">
                <div className="w-full text-lg font-semibold flex max-w-max items-center justify-center">
                  <span className="rounded-full bg-white h-14 w-14 flex items-center justify-center">
                    <MdComputer size={24} />
                  </span>
                  &nbsp; &nbsp;
                  <span>IT Department</span>
                </div>
              </div>
            </label>
          </div>
          <div className="">
            <input
              type="radio"
              id="hosting-big"
              name="hosting"
              value={"Communications"}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="hidden peer"
            />
            <label
              htmlFor="hosting-big"
              className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-[#FFE8D9] border border-gray-200 rounded-lg cursor-pointer peer-checked:text-[#484848] hover:text-gray-600 hover:bg-gray-100 peer-checked:ring-[#00A651]  peer-checked:border-[#00A651] peer-checked:bg-[#C7FFE2] h-24"
            >
              <div className="block">
                <div className="w-full text-lg font-semibold flex max-w-max items-center justify-center">
                  <span className="rounded-full bg-white h-14 w-14 flex items-center justify-center">
                    <MdPhone size={24} />
                  </span>
                  &nbsp; &nbsp;
                  <span>Communication Department</span>
                </div>
              </div>
            </label>
          </div>
        </RadioGroup>

        {/* <Button
          variant="contained"
          color="primary"
          style={{ color: "#fff", backgroundColor: "#00A651" }}
          className="max-w-max w-full grid place-items-center px-12 py-4 rounded-2xl"
          onClick={handleAssignClick}
          disabled={selectedDepartment === ""}
        >
          Assign
        </Button> */}

        <Button
          variant="contained"
          color="primary"
          style={{
            color: "#fff",
            backgroundColor: "#00A651",
            padding: "1rem 3.5rem",
            fontSize: "1.5rem",
            borderRadius: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textTransform: "capitalize",
          }}
          className="max-w-max w-full grid place-items-center px-12 py-4 rounded-2xl capitalize"
          onClick={handleAssignClick}
          disabled={selectedDepartment === ""}
        >
          Assign
        </Button>

        {showConfirmationModal && (
          <AssignedConfirmModal
            adminId={adminId}
            selectedDepartment={selectedDepartment}
            handleClose={() => setShowConfirmationModal(false)}
            handleConfirm={handleConfirm}
          />
        )}
      </FormControl>
    </>
  );
};

export default DepartmentCard;
