import React from "react";
import { Alert, Button, Typography } from "@mui/material";

export default function ConfirmationModal() {
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
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              <Alert severity="success" color="success">
                Admin was Deleted successfully
              </Alert>;
            }}
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg !text-sm inline-flex items-center px-5 py-2.5 text-center mr-8"
          >
            Yes, I am sure
          </Button>

          {/* <LoadingButton loading variant="outlined">
            Submit
          </LoadingButton> */}
          <Button
            // variant="outlined"
            // color="error"
            onClick={() => {
              alert("close ");
            }}
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 ring-2 focus:outline-gray-500 focus:ring-gray-200 rounded-lg border border-gray-600 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
          >
            No, cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
