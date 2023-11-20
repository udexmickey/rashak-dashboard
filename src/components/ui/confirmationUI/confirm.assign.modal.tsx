import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";
import PositionedSnackbar from "../alert/snack";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid transparent",
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  pt: 2,
  px: 6,
  pb: 3,
};

interface ConfirmationModalProps {
  adminId: string;
  selectedDepartment: string;
  handleClose: () => void;
}

const AssignedConfirmModal: React.FC<ConfirmationModalProps> = ({ adminId, selectedDepartment, handleClose }) => {
  const handleConfirm = () => {
    console.log(`Admin ID: ${adminId}, Selected Department: ${selectedDepartment}`);
    // handleClose();
    <PositionedSnackbar />
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400, }}>
          {/* <h2 id="parent-modal-title">Confirmation</h2> */}
            <Typography
              id="transition-modal-close"
              component="button"
              className="text-xl font-normal text-[#9E9E9E] cursor-pointer hover:opacity-60 text-right"
              onClick={handleClose}
            >
              <IoClose />
          </Typography>
          <Typography id="parent-modal-description" className="text-[#1E1E1E] text-2xl text-center">
          Are you sure you want to Re-assign this admin to 
          <Typography className="block">{selectedDepartment} department?</Typography>
          </Typography>
          <div className="flex justify-center items-center">
            <Button variant="contained" color="success" 
            className="text-white bg-[#00A651] hover:bg-opacity-70 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg inline-flex items-center px-5 py-2.5 text-center"
            onClick={handleConfirm}>
                Confirm
            </Button>
            <Button variant="contained" 
            color="secondary" 
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg inline-flex items-center px-5 py-2.5 text-center"
            onClick={handleClose} sx={{ ml: 2 }}>
                Cancel
            </Button>

          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AssignedConfirmModal;