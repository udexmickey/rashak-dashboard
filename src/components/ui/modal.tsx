import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import DepartmentCard from "./DepartmentCard";
import ConfirmationModal from "./deleteAdminConfirmationModal";
import { IoClose } from "react-icons/io5";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#F8F8F8",
  border: "1px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

interface modalProps {
  title: string;
  adminId: string;
  modalName: string;
  handleClose: () => void;
  handleReassign: (adminId: string, selectedDepartment: string) => void;
  children: React.ReactNode;
}

const NestedModal: React.FC<modalProps> = ({
  modalName,
  handleClose,
  title,
  adminId,
  handleReassign,
  children,
}) => {
  return (
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: "auto",
          maxWidth: 990,
          maxHeight: 587,
          height: "auto",
        }}
      >
        <Typography
          id="transition-modal"
          variant="h6"
          component="div"
          className="flex justify-between w-full"
        >
          <Typography
            id="transition-modal-title"
            variant="h6"
            component="h2"
            className="mb-5 text-xl font-normal text-[#1E1E1E]"
          >
            {title ?? ""}
          </Typography>
          <Typography
            id="transition-modal-close"
            component="button"
            className="mb-5 text-xl font-normal text-[#9E9E9E] cursor-pointer hover:opacity-60"
            onClick={handleClose}
          >
            <IoClose />
          </Typography>
        </Typography>
        {modalName === "re-assign" && (
          <DepartmentCard
            title="Re-Assign Admin Department"
            adminId={adminId}
            handleReassign={handleReassign} // Pass down handleReassign function
          />
        )}
        {modalName === "delete" && (
          <ConfirmationModal />
        )}
      </Box>
    </Modal>
  );
};

export default NestedModal;
