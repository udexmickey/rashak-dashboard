import React from "react";
import { Alert, Button, Typography } from "@mui/material";
import { IoCheckmarkSharp, IoClose } from "react-icons/io5";

export default function DeleteConfirmationModal() {
  return (
    <div className="relative w-full max-h-full">
      <div className="relative rounded-lg">
        <div className="p-6 text-center">
          <svg
            className="mx-auto mb-4 text-gray-400 w-12 h-12"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <Typography
            component={"h3"}
            variant="h3"
            className="mb-5 text-lg font-normal text-gray-500 "
          >
            Are you sure you want to delete this Admin?
          </Typography>
          <div className="flex justify-center items-center">

          <Button
              variant="contained"
              color="success"
              className="inline-flex items-center justify-start w-full text-[#484848] text-xl font-medium bg-[#C7FFE2] border border-gray-200 rounded-lg cursor-pointer 
           hover:text-gray-600 hover:bg-gray-100 md:px-8 px-4 py-5 h-24"
           onClick={() => {
            <Alert severity="success" color="success">
              Admin was Deleted successfully
            </Alert>;
          }}
            >
              <span className="bg-white rounded-full h-9 w-9 justify-center items-center flex me-4 -ms-1">
                <IoCheckmarkSharp
                  size={16}
                  className="w-6 h-6 text-[#00A651]"
                />
              </span>
              Yes, I am sure
            </Button>
            <Button
              variant="contained"
              className="inline-flex items-center justify-start w-full text-[#484848] text-xl font-medium bg-[#ff000033] border border-gray-200 rounded-lg cursor-pointer 
           hover:text-gray-600 hover:bg-gray-100 md:px-8 px-4 py-5 h-24"
           onClick={() => {
            alert("close ");
          }}
              sx={{ ml: 2 }}
            >
              <span className="bg-white rounded-full h-9 w-9 justify-center items-center flex me-4 -ms-1">
                <IoClose size={16} className="w-6 h-6 text-[#ff0000]" />
              </span>
              No, cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
