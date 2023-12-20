// BoardMemberUpdateForm.tsx

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import useUnsavedFormChanges from "@/hooks/useUnsavedFormChanges";
import { useUpdateOneBoard } from "@/hooks/member/useMembersHook";

interface BoardMemberUpdateFormProps {
  initialValues: {
    _id: string;
    name: string;
    role: string;
    linkedinLink: string;
    image: File | null;
  };
  // handleUpdate: (data: Record<string, any>) => void;
}

const BoardMemberUpdateForm: React.FC<BoardMemberUpdateFormProps> = ({
  initialValues,
  // handleUpdate,
}) => {
  const { setUnsavedChanges } = useUnsavedFormChanges();
  const [memberId, setMemberId] = React.useState(initialValues._id);
  const [name, setName] = React.useState(initialValues.name);
  const [role, setRole] = React.useState(initialValues.role);
  const [linkedinLink, setLinkedinLink] = React.useState(
    initialValues.linkedinLink
  );
  const [file, setFile] = React.useState<File | null>(initialValues.image);
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
    mutateAsync: updatePost,
    isPending,
    isSuccess,
    error,
    isError: isErroruUpdate,
    reset,
  } = useUpdateOneBoard(memberId);

  // Handler for updating the board member
  const handleUpdate = async (formData: Record<string, any>) => {
    // Perform the update logic with the formData

    await updatePost(formData);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = {
        name,
        role,
        linkedinLink,
        file,
      };

      handleUpdate(formData);
      setUnsavedChanges(false);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      const resetTime = setTimeout(() => {
        reset();
      }, 2000);

      return () => clearTimeout(resetTime);
    }
  }, [isSuccess, reset]);

  return (
    <form onSubmit={handleSubmit} className="md:w-[850px]">
      <Box
        component={"div"}
        className="flex flex-col md:flex-row justify-center items-center gap-y-2 md:gap-y-8  md:gap-x-10"
      >
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
                  src={
                    typeof file === "string" ? file : URL.createObjectURL(file)
                  }
                  width={400}
                  height={400}
                  priority
                  quality={100}
                  alt="File Preview"
                  className="max-w-xl w-full h-[35dvh] object-contain bg-slate-200"
                />
              ) : (
                <Box
                  sx={{ bgcolor: "#D9D9D9", maxHeight: "35vh", height: "auto" }}
                  width={400}
                  className="max-w-full aspect-square"
                >
                  <div className="flex bg-[#D9D9D9] flex-col items-center justify-center pt-5 pb-6 max-w-96 w-full h-[35vh]">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500"
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
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500">
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
        </div>
      </Box>
      {isErroruUpdate && (
        <p>
          Login Error: {` `}
          <span className="text-[#ff0000]">
            {` `} {error?.message}
          </span>
        </p>
      )}
      {isPending && (
        <p>
          Please wait: {` `}
          <span className="text-[#f1c557]">{` `} updating...</span>
        </p>
      )}
      {isSuccess && (
        <p>
          Success: {` `}
          <span className="text-[#00A651]">{` `} member Updated</span>
        </p>
      )}
    </form>
  );
};

export default BoardMemberUpdateForm;
