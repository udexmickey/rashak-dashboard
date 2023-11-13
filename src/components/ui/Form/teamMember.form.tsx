import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const TeamMemberForm: React.FC = () => {
  const [name, setName] = React.useState("");
  const [role, setRole] = React.useState("");
  const [youtubeLink, setYoutubeLink] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [nameError, setNameError] = React.useState<string | null>(null);
  const [roleError, setRoleError] = React.useState<string | null>(null);
  const [unsavedChanges, setUnsavedChanges] = React.useState(false);

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

  const handleYoutubeLinkChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setYoutubeLink(event.target.value);
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

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = {
        name,
        role,
        youtubeLink,
        file,
      };

      console.log("Form Data:", formData);
      setUnsavedChanges(false);
    }
  };

  React.useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (unsavedChanges) {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [unsavedChanges]);

  return (
    <form onSubmit={handleSubmit}>
      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={4}>
        {/* Left Column (File Upload) */}
        <div>
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
          </label>
          <br /><br />
          {file && (
            <Image
              src={URL.createObjectURL(file)}
              width={300}
              height={400}
              alt="File Preview"
              className="max-w-full mb-4"
            />
          )}
        </div>

        {/* Right Column (Name, Role, YoutubeLink) */}
        <div>
          <Typography variant="h6" gutterBottom>
            Add New Team Member
          </Typography>
          <label htmlFor="name" className="block mb-1">
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
          <label htmlFor="role" className="block mb-1">
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
          <label htmlFor="youtubeLink" className="block mb-1">
            Youtube Link:
          </label>
          <TextField
            id="youtubeLink"
            variant="outlined"
            fullWidth
            value={youtubeLink}
            onChange={handleYoutubeLinkChange}
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
          >
            Save
          </Button>
        </div>
      </Box>
    </form>
  );
};

export default TeamMemberForm;
