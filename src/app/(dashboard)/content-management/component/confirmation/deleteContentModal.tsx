import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";
import useDeletePost from "@/hooks/useDeletePost";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  maxWidth: "50vw",
  maxHeight: "50dvh",
  height: "100%",
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
  contentId: string;
  error: string | null;
  isError: boolean | null;
  isSuccess: boolean | null;
  isLoading: boolean;
  selectedContent?: string;
  handleClose: () => void;
  handleConfirm: () => void;
}

const DeleteConfirmModal: React.FC<ConfirmationModalProps> = ({
  contentId,
  isError,
  isSuccess,
  isLoading,
  error,
  selectedContent,
  handleClose,
  handleConfirm,
}) => {
  useEffect(() => {
    //close modal in 500miliseconds
    // setTimeout(() => {
    isSuccess && handleClose();
    // }, 2000);
  }, [error, handleClose, isSuccess]);

  return (
    <div>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, minWidth: 350 }}>
          <div className="flex justify-between items-center text-[#1E1E1E] text-2xl">
            <h2 className="">Delete Content</h2>
            <Typography
              id="transition-modal-close"
              component="button"
              className="text-3xl font-normal text-[#9E9E9E] cursor-pointer hover:opacity-60 text-right"
              onClick={handleClose}
            >
              <IoClose />
            </Typography>
          </div>
          <div className="flex flex-col justify-center gap-y-8 h-full pb-8 ">
            <Typography
              component="div"
              className="text-[#1E1E1E] text-2xl text-center flex flex-col gap-y-4"
            >
              Are you sure you want to Delete this content
              <Typography className="block text-2xl">
                <span className="text-[#00A651]">{selectedContent}</span>
                {` `}
              </Typography>
            </Typography>
            <div className="">
              {/* Loading or error indicator */}
              {isLoading && (
                <div className="flex items-center justify-center border rounded-lg border-gray-700">
                  <div className="px-3 py-1 text-xs font-medium leading-none text-center bg-green-200 rounded-full animate-pulse text-green-700">
                    Deleting...
                  </div>
                </div>
              )}
              {error && (
                <p>
                  Error: {` `}
                  <span className="text-[#ff0000]">
                    {` `} {error}
                  </span>
                </p>
              )}
            </div>
            <div className="flex justify-center items-center">
              <Button
                variant="contained"
                color="success"
                className="inline-flex items-center justify-start w-full text-[#484848] text-xl font-medium bg-[#C7FFE2] border border-gray-200 rounded-lg cursor-pointer 
           hover:text-gray-600 hover:bg-gray-100 md:px-8 px-4 py-5 h-24"
                onClick={handleConfirm}
                disabled={isLoading}
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
                disabled={isLoading}
              >
                <span className="bg-white rounded-full h-9 w-9 justify-center items-center flex me-4 -ms-1">
                  <IoClose size={16} className="w-6 h-6 text-[#ff0000]" />
                </span>
                No
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteConfirmModal;
