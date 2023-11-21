import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";
import TeamMemberForm from "../Form/teamMember.form";
import BoardMemberForm from "../Form/boardMemberForm";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  bgcolor: "background.paper",
  border: "1px solid transparent",
  boxShadow: 24,
  // display: 'flex',
  // flexDirection: 'column',
  // gap: '2rem',
  pt: 2,
  // px: 6,
  pb: 3,
};

interface ConfirmationModalProps {
  selectedMember: string;
  handleClose: () => void;
}

const MemberConfirmModal: React.FC<ConfirmationModalProps> = ({
  selectedMember,
  handleClose,
}) => {
  return (
    <>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{
            ...style,
            maxWidth: 900,
            minHeight: "60dvh",
            minWidth: "350px",
          }}
          className="px-2 md:px-8"
        >
          <div className="flex justify-between items-center">
            <Typography
              id="transition-modal-close"
              component="h2"
              className="md:text-2xl mb-4"
            >
              {selectedMember === "team"
                ? "Add New Team Member"
                : "Add New Board Member"}
            </Typography>
            <Typography
              id="transition-modal-close"
              component="button"
              className="text-2xl mb-4 font-normal text-[#9E9E9E] cursor-pointer hover:opacity-60 text-right"
              onClick={handleClose}
            >
              <IoClose />
            </Typography>
          </div>
          {selectedMember === "team" ? <TeamMemberForm /> : <BoardMemberForm />}
        </Box>
      </Modal>
    </>
  );
};

export default MemberConfirmModal;
