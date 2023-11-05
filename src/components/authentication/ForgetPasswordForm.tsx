"use client";
import { useState, ChangeEvent, FormEvent } from "react";
import { Paper, TextField, Button } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Values {
  email: string;
  emailError: boolean;
}

const ForgetPasswordForm = () => {
  const [values, setValues] = useState<Values>({
    email: "",
    emailError: false,
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const router = useRouter();

  const handleChange =
    (prop: keyof Values) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.match(emailRegex)) {
      setValues({ ...values, emailError: true });
      return;
    }

    // Mock API Call (replace this with actual API call)
    const submitForm = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ message: "password sent successful" });
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
        }, 9000);
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-start h-screen w-[100%] max-w-2xl isolate box-border md:gap-y-20 gap-y-10">
      <div className="flex justify-end md:w-[90%] w-[90%]">
        <Link href={"/login"}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#00A651", color: "#ffffff" }}
            type="submit"
            className="rounded-[2.5rem] text-base px-3 py-3 md:px-6 md:py-5 capitalize"
            sx={{
              "&:focus": { backgroundColor: "#00A651" },
              "&.Mui-error": { backgroundColor: "red" },
            }}
          >
            Login
          </Button>
        </Link>
      </div>
      <Paper
        elevation={0}
        className="p-8 text-center rounded-[1rem] w-full flex gap-y-6 flex-col"
      >
        <div className="mb-4">
          <h2 className="text-left text-3xl !text-[#00a651] ">
            Forgot Password
          </h2>
        </div>
        <form
          className="text-left flex gap-y-6 flex-col"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="text-base mb-2 block text-[#A0A3BD]">Email</label>
            <div className="relative">
              <TextField
                variant="outlined"
                fullWidth
                type="email"
                placeholder="Enter your email"
                required
                value={values.email}
                size="medium"
                onChange={handleChange("email")}
                InputProps={{
                  classes: {
                    root: "border-none rounded-[2.5rem] h-16 text-base",
                  },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={values.emailError}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: values.emailError ? "#F5821F" : "#00A651",
                    },
                }}
              />
              {values.emailError && (
                <p className="text-[#F5821F] mt-2 text-xs">
                  Please enter a valid email
                </p>
              )}
            </div>
          </div>
          <Button
            variant="contained"
            style={{ backgroundColor: "#00A651", color: "#ffffff" }}
            type="submit"
            className="rounded-[2.5rem] md:w-44 w-28 text-base py-2 md:py-4 md:text-xl capitalize"
            sx={{
              "&:focus": { backgroundColor: "#00A651" },
              "&.Mui-error": { backgroundColor: "red" },
            }}
          >
            Send Link
          </Button>
          <label className="text-xs text-left mb-2 block text-[#9f9f9f]">
            <Link href={"/login"}>
              Remember your password?{" "}
              <span className="text-[#00A651]">Log In</span>
            </Link>
          </label>
        </form>
        {showSuccessMessage && (
          <div className="text-[#00A651] text-base mb-4">
            Password reset link sent successfully. Please check your email.
          </div>
        )}
      </Paper>
    </div>
  );
};

export default ForgetPasswordForm;
