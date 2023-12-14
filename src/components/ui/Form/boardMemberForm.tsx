"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import useUnsavedFormChanges from "@/hooks/useUnsavedFormChanges";
import { usePostBoardMember } from "@/hooks/member/useMembersHook";

export default function BoardMemberForm({
  handleClose,
}: {
  handleClose: () => void;
}) {
  const { setUnsavedChanges } = useUnsavedFormChanges();
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [linkedinLink, setLinkedinLink] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [nameError, setNameError] = React.useState<string | null>(null);
  const [roleError, setRoleError] = React.useState<string | null>(null);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    setNameError(null); // Reset error when the user types
    setUnsavedChanges(true);
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRole(event.target.value);
    setRoleError(null); // Reset error when the user types
    setUnsavedChanges(true);
  };

  const handleLinkedinLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLinkedinLink(event.target.value);
    setUnsavedChanges(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);
    setUnsavedChanges(true);
  };

  const validateForm = () => {
    let isValid = true;

    if (!name.trim()) {
      setNameError("Name is required");
      isValid = false;
    }

    if (!role.trim()) {
      setRoleError("Role is required");
      isValid = false;
    }

    return isValid;
  };

  const {
    mutateAsync: addBoardMemberFxn,
    isPending,
    isSuccess,
    isError,
    error,
    reset,
  } = usePostBoardMember();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = {
        name,
        role,
        linkedinLink,
        file,
      };

      await addBoardMemberFxn(formData);
      setUnsavedChanges(false);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      setName((prev) => (prev = ""));
      setRole((prev) => (prev = ""));
      setLinkedinLink((prev) => (prev = ""));
      setFile((prev) => (prev = null));

      const resetTime = setTimeout(() => {
        reset();
        handleClose();
      }, 3000);

      return () => clearTimeout(resetTime);
    }
  }, [handleClose, isSuccess, reset]);

  return (
    <form onSubmit={handleSubmit}>
      <Box className="flex flex-col md:flex-row justify-center items-center gap-y-8 md:gap-x-10 flex-grow">
        {/* Left Column (File Upload) */}
        <div className="md:w-1/2 w-[90%] px-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="mb-4">
            <Button
              variant="contained"
              component="span"
              fullWidth
              color="primary"
              style={{ backgroundColor: "#00A651", color: "white" }}
            >
              Upload File
            </Button>
            <br />
            <div className="h-full cursor-grab min-h-full relative flex md:justify-start items-center justify-center mt-4 md:mt-6">
              {file ? (
                <Image
                  src={URL.createObjectURL(file)}
                  width={400}
                  height={500}
                  alt="File Preview"
                  className="max-w-full aspect-square"
                />
              ) : (
                <Box
                  sx={{ bgcolor: "#D9D9D9", height: "35vh" }}
                  width={400}
                  className="max-w-full aspect-square"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6 w-96 h-[35vh]">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 bg-[#D9D9D9]"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 bg-[#D9D9D9]">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 bg-[#D9D9D9]">
                      PNG, or JPG (MAX. 800x400px)
                    </p>
                  </div>
                </Box>
              )}
            </div>
          </label>
        </div>

        {/* Right Column (Name, Role, LinkedinLink) */}
        <div className="md:w-1/2 w-[90%] px-2">
          <Typography variant="h6" gutterBottom>
            {/* Add New Board Member */}{" "}
          </Typography>
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <TextField
            id="name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={handleNameChange}
            margin="normal"
            error={!!nameError}
            helperText={nameError}
            autoFocus
            InputProps={{
              classes: {
                root: "rounded-3xl",
                focused: "bg-#00A651",
              },
            }}
          />
          <label htmlFor="role" className="block mb-2">
            Role:
          </label>
          <TextField
            id="role"
            variant="outlined"
            fullWidth
            value={role}
            onChange={handleRoleChange}
            margin="normal"
            error={!!roleError}
            helperText={roleError}
            InputProps={{
              classes: {
                root: "rounded-3xl",
                focused: "bg-#00A651",
              },
            }}
          />
          <label htmlFor="linkedinLink" className="block mb-2">
            Linkedin Link:
          </label>
          <TextField
            id="linkedinLink"
            variant="outlined"
            fullWidth
            value={linkedinLink}
            onChange={handleLinkedinLinkChange}
            margin="normal"
            InputProps={{
              classes: {
                root: "rounded-3xl",
                focused: "bg-#00A651",
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ backgroundColor: "#00A651", color: "white" }}
            className="block mt-4 md:py-2 md:text-lg"
          >
            Save
          </Button>

          {isError && (
            <p>
              Error: {` `}
              <span className="text-[#ff0000]">
                {` `} {error?.message}
              </span>
            </p>
          )}
          {isPending && (
            <p>
              Please wait: {` `}
              <span className="text-[#f1c557]">{` `} Posting...</span>
            </p>
          )}
          {isSuccess && (
            <p>
              Posted: {` `}
              <span className="text-[#00A651]">{` `} Member Added</span>
            </p>
          )}
        </div>
      </Box>
    </form>
  );
}

// export default BoardMemberForm;
