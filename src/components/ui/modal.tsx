import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Typography } from "@mui/material";
import { IoClose } from "react-icons/io5";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
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

interface ModalProps {
  title: string;
  modalClassName?: string;
  handleClose: () => void;
  children: React.ReactNode;
}

const NestedModal: React.FC<ModalProps> = ({ title, handleClose, children, modalClassName }) => {
  const [open, setOpen] = React.useState(true);

  const handleCloseModal = () => {
    setOpen(false);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          ...style,
          maxWidth: 900,
          maxHeight: "96dvh",
          // minHeight: "96dvh",
          minWidth: "350px",
          height: 'auto',
          // width: 'auto'
        }}
        className={`px-2 md:px-8 ${modalClassName}`}
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
            className="md:mb-5 mb-2 text-xl font-normal text-[#1E1E1E]"
          >
            {title ?? ""}
          </Typography>
          <Typography
            id="transition-modal-close"
            component="button"
            className="md:mb-5 mb-2 text-xl font-normal text-[#9E9E9E] cursor-pointer hover:opacity-60"
            onClick={handleCloseModal}
          >
            <IoClose />
          </Typography>
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default NestedModal;
