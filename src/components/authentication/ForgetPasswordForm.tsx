"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Paper, TextField, Button } from "@mui/material";
import Link from "next/link";
import { useForgetPassword } from "@/hooks/authentication/useForgetPassword";

interface Values {
  email: string;
  emailError: boolean;
}

const ForgetPasswordForm = () => {
  const [values, setValues] = useState<Values>({
    email: "",
    emailError: false,
  });

  const handleChange =
    (prop: keyof Values) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const {
    mutateAsync: ForgetPasswordFxn,
    isPending,
    isError,
    error,
    isSuccess,
    data,
    reset,
  } = useForgetPassword();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.match(emailRegex)) {
      setValues({ ...values, emailError: true });
      return;
    }

    try {
      //forgetPassword function from useForgetPassword hook
      await ForgetPasswordFxn(values.email);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    // const timeSession = setTimeout(() => {
    //   isSuccess && reset();
    // }, 6000);
    // return () => clearTimeout(timeSession);
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

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
          {isError && (
            <p className="text-center">
              Error: {` `}
              <span className="text-[#ff0000]">
                {` `} {error?.message}
              </span>
            </p>
          )}
          {isPending && (
            <p>
              Please wait: {` `}
              <span className="text-[#f1c557]">
                {` `} While verify you credentials...
              </span>
            </p>
          )}
          {isSuccess && (
            <p className="text-center">
              success: {` `}
              <span className="text-[#00A651]">
                {` `} {data && data?.message}
              </span>
            </p>
          )}
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
        {/* {isSuccess && (
          <div className="text-[#00A651] text-base mb-4">
            {data &&
              (data?.message ??
                "Password reset link sent successfully. Please check your email.")}
          </div>
        )} */}
      </Paper>
    </div>
  );
};

export default ForgetPasswordForm;
