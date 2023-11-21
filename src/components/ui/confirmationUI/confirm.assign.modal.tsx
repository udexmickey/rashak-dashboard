import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import PositionedSnackbar from "../alert/snack";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "650px",
  bgcolor: "background.paper",
  border: "1px solid transparent",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
  pt: 2,
  px: 6,
  pb: 3,
};

interface ConfirmationModalProps {
  adminId: string;
  selectedDepartment: string;
  handleClose: () => void;
}

const AssignedConfirmModal: React.FC<ConfirmationModalProps> = ({
  adminId,
  selectedDepartment,
  handleClose,
}) => {
  const handleConfirm = () => {
    console.log(
      `Admin ID: ${adminId}, Selected Department: ${selectedDepartment}`
    );
    // handleClose();
    <PositionedSnackbar />;
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, minWidth: 350 }}>
          {/* <h2 id="parent-modal-title">Confirmation</h2> */}
          <Typography
            id="transition-modal-close"
            component="button"
            className="text-xl font-normal text-[#9E9E9E] cursor-pointer hover:opacity-60 text-right"
            onClick={handleClose}
          >
            <IoClose />
          </Typography>
          <Typography
          component="div"
            className="text-[#1E1E1E] text-2xl text-center"
          >
            Are you sure you want to Re-assign this admin to
            <Typography className="block text-2xl">
              <span className="text-[#00A651]">{selectedDepartment}</span>
              {` `}Department?
            </Typography>
          </Typography>
          <div className="flex justify-center items-center">
            <Button
              variant="contained"
              color="success"
              className="inline-flex items-center justify-start w-full text-[#484848] text-xl font-medium bg-[#C7FFE2] border border-gray-200 rounded-lg cursor-pointer 
           hover:text-gray-600 hover:bg-gray-100 md:px-8 px-4 py-5 h-24"
              onClick={handleConfirm}
            >
              <span className="bg-white rounded-full h-9 w-9 justify-center items-center flex me-4 -ms-1">
                <IoCheckmarkSharp
                  size={16}
                  className="w-6 h-6 text-[#00A651]"
                />
              </span>
              Yes
            </Button>
            <Button
              variant="contained"
              className="inline-flex items-center justify-start w-full text-[#484848] text-xl font-medium bg-[#ff000033] border border-gray-200 rounded-lg cursor-pointer 
           hover:text-gray-600 hover:bg-gray-100 md:px-8 px-4 py-5 h-24"
              onClick={handleClose}
              sx={{ ml: 2 }}
            >
              <span className="bg-white rounded-full h-9 w-9 justify-center items-center flex me-4 -ms-1">
                <IoClose size={16} className="w-6 h-6 text-[#ff0000]" />
              </span>
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AssignedConfirmModal;
