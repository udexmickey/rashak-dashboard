"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Paper, TextField, Button } from "@mui/material";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface Values {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
  showPassword: boolean;
  passwordError: boolean;
  confirmNewPasswordError: boolean;
}

const ResetPasswordForm = ({
  params,
}: {
  params: { resetpasswordId: string };
}) => {
  const [values, setValues] = useState<Values>({
    token: "",
    newPassword: "",
    confirmNewPassword: "",
    showPassword: false,
    passwordError: false,
    confirmNewPasswordError: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const router = useRouter();

  const handleChange =
    (prop: keyof Values) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({
        ...values,
        token: params.resetpasswordId ?? event.target.value,
        [prop]: event.target.value,
      });
    };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Password validation (minimum 8 characters)
    if (values.newPassword.length < 8) {
      setValues({ ...values, passwordError: true });
      return;
    }

    // Confirm Password validation
    if (values.newPassword !== values.confirmNewPassword) {
      setValues({ ...values, confirmNewPasswordError: true });
      return;
    }

    // Mock API Call (replace this with actual API call)
    const submitForm = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ message: "Password reset was successful" });
        }, 1000);
      });
    };

    submitForm()
      .then((response) => {
        console.log("Form submitted:", values);
        console.log("API Response:", response);

        // Show success message
        setShowSuccessMessage(true);

        // Hide success message after 2000 milliseconds (2 seconds)
        setTimeout(() => {
          setShowSuccessMessage(false);

          // Redirect to the check page
          router.push("/login");
        }, 7000);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen w-[100%] max-w-2xl isolate box-border md:gap-y-20 gap-y-10">
      <div className="flex justify-end md:w-[90%] w-[90%]"></div>
      <Paper
        elevation={0}
        className="p-8 text-center rounded-[1rem] w-full flex gap-y-2 flex-col"
      >
        <div className="mb-4">
          <label className="text-base text-left mb-2 block text-[#A0A3BD]">
            Enter new password
          </label>
          <h2 className="text-left text-3xl !text-[#00a651] ">
            Reset password
          </h2>
        </div>
        <form
          className="text-left flex gap-y-4 flex-col"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="text-base mb-2 block text-[#A0A3BD]">Token</label>
            <div className="relative">
              <TextField
                variant="outlined"
                fullWidth
                type="text"
                placeholder="Paste your token"
                required
                value={params.resetpasswordId ?? values.token}
                // defaultValue={params.resetpasswordId}
                disabled={params.resetpasswordId !== null || params.resetpasswordId !== undefined ? true : false}
                size="medium"
                onChange={handleChange("token")}
                InputProps={{
                  classes: {
                    root: "border-none rounded-[2.5rem] h-16 text-base",
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="text-base mb-2 block text-[#A0A3BD]">
              New Password
            </label>
            <div className="relative">
              <TextField
                variant="outlined"
                fullWidth
                type={showPassword ? "password" : "text"}
                placeholder="Enter your newPassword"
                required
                value={values.newPassword}
                size="medium"
                onChange={handleChange("newPassword")}
                InputProps={{
                  classes: {
                    root: "border-none rounded-[2.5rem] h-16 text-base",
                  },
                  endAdornment: (
                    <span className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer">
                      {showPassword ? (
                        <BsEye onClick={() => setShowPassword(false)} />
                      ) : (
                        <BsEyeSlash onClick={() => setShowPassword(true)} />
                      )}
                    </span>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={values.passwordError}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: values.passwordError ? "#F5821F" : "#00A651",
                    },
                }}
              />
              {values.passwordError && (
                <p className="text-[#F5821F] mt-2 text-xs">
                  Password must be at least 8 characters long
                </p>
              )}
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="text-base mb-2 block text-[#A0A3BD]">
              Confirm New Password
            </label>
            <div className="relative">
              <TextField
                variant="outlined"
                fullWidth
                type={showPassword ? "password" : "text"}
                placeholder="Confirm your password"
                required
                value={values.confirmNewPassword}
                size="medium"
                onChange={handleChange("confirmNewPassword")}
                InputProps={{
                  classes: {
                    root: "border-none rounded-[2.5rem] h-16 text-base",
                  },
                  endAdornment: (
                    <span className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer">
                      {showPassword ? (
                        <BsEye onClick={() => setShowPassword(false)} />
                      ) : (
                        <BsEyeSlash onClick={() => setShowPassword(true)} />
                      )}
                    </span>
                  ),
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={values.confirmNewPasswordError}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: values.confirmNewPasswordError
                        ? "#F5821F"
                        : "#00A651",
                    },
                }}
              />
              {values.confirmNewPasswordError && (
                <p className="text-[#F5821F] mt-2 text-xs">
                  Passwords do not match
                </p>
              )}
            </div>
            <p className="text-[#A0A3BD] mt-2 text-xs">
              Password should be 8 characters minimum.
            </p>
          </div>
          <Button
            variant="contained"
            style={{ backgroundColor: "#00A651", color: "#ffffff" }}
            type="submit"
            className="rounded-[2.5rem] md:w-64 text-base py-4 md:text-xl capitalize"
            sx={{
              "&:focus": { backgroundColor: "#00A651" },
              "&.Mui-error": { backgroundColor: "red" },
            }}
          >
            Reset Password
          </Button>
        </form>
        {showSuccessMessage && (
          <div className="text-[#00A651] text-base mb-4">
            Password reset successfully. You can now login with your new
            Password.
          </div>
        )}
      </Paper>
    </div>
  );
};

export default ResetPasswordForm;
