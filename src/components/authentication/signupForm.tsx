"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Paper, TextField, Button } from "@mui/material";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSignUp } from "@/hooks/authentication/useSignUp";

interface Values {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  showPassword: boolean;
  emailError: boolean;
  passwordError: boolean;
  confirmPasswordError: boolean;
}

const SignupForm = () => {
  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
    showPassword: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(true);

  const {
    mutateAsync: signUpFxn,
    isPending,
    isError,
    error,
    isSuccess,
    data,
  } = useSignUp();

  const router = useRouter();

  const handleChange =
    (prop: keyof Values) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSignUpSuccess = () => {
    // Redirect to the check page
    router.push("/check");
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      event.preventDefault();

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!values.email.match(emailRegex)) {
        setValues({ ...values, emailError: true });
        return;
      }

      // Password validation (minimum 8 characters)
      if (values.password.length < 8) {
        setValues({ ...values, passwordError: true });
        return;
      }

      // Confirm Password validation
      if (values.password !== values.confirmPassword) {
        setValues({ ...values, confirmPasswordError: true });
        return;
      }

      //signup function from useSignup hook
      await signUpFxn(values);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    isSuccess && handleSignUpSuccess();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="flex flex-col items-center justify-start h-screen w-[100%] max-w-2xl isolate box-border gap-y-10">
      <div className="flex justify-end md:w-[90%] w-[90%]">
        <Link href={"/login"}>
          <Button
            variant="contained"
            style={{ backgroundColor: "#00A651", color: "#ffffff" }}
            type="submit"
            className="rounded-[2.5rem] text-xl px-3 py-3 md:px-10 md:py-5 capitalize"
            sx={{
              "&:focus": { backgroundColor: "#00A651" },
              "&.Mui-error": { backgroundColor: "red" },
            }}
          >
            Log In
          </Button>
        </Link>
      </div>
      <Paper
        elevation={0}
        className="p-8 text-center rounded-[1rem] w-full flex gap-y-2 flex-col"
      >
        <div className="mb-4">
          {/* <label className="text-base text-left mb-2 block text-[#A0A3BD]">Welcome back</label> */}
          <h2 className="text-left text-3xl !text-[#00a651] ">
            Create Account
          </h2>
        </div>
        <form
          className="text-left flex gap-y-4 flex-col"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label className="text-base mb-2 block text-[#A0A3BD]">
              Full Name
            </label>
            <div className="relative">
              <TextField
                variant="outlined"
                fullWidth
                type="text"
                placeholder="Enter your full name"
                required
                value={values.name}
                size="medium"
                onChange={handleChange("name")}
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
                      borderColor:
                        values.emailError &&
                        values.password !== values.confirmPassword
                          ? "#F5821F"
                          : "#00A651",
                    },
                }}
              />
              {values.emailError &&
                values.password !== values.confirmPassword && (
                  <p className="text-[#F5821F] mt-2 text-xs">
                    Please enter a valid email
                  </p>
                )}
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="text-base mb-2 block text-[#A0A3BD]">
              Password
            </label>
            <div className="relative">
              <TextField
                variant="outlined"
                fullWidth
                type={showPassword ? "password" : "text"}
                placeholder="Enter your password"
                required
                value={values.password}
                size="medium"
                onChange={handleChange("password")}
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
                      borderColor:
                        values.passwordError &&
                        values.password !== values.confirmPassword
                          ? "#F5821F"
                          : "#00A651",
                    },
                }}
              />
              {values.passwordError &&
                values.password !== values.confirmPassword && (
                  <p className="text-[#F5821F] mt-2 text-xs">
                    Password must be at least 8 characters long
                  </p>
                )}
            </div>
          </div>
          <div className="mb-4 relative">
            <label className="text-base mb-2 block text-[#A0A3BD]">
              Confirm Password
            </label>
            <div className="relative">
              <TextField
                variant="outlined"
                fullWidth
                type={showPassword ? "password" : "text"}
                placeholder="Confirm your password"
                required
                value={values.confirmPassword}
                size="medium"
                onChange={handleChange("confirmPassword")}
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
                error={values.confirmPasswordError}
                sx={{
                  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor:
                        values.confirmPasswordError &&
                        values.password !== values.confirmPassword
                          ? "#F5821F"
                          : "#00A651",
                    },
                }}
              />
              {values.confirmPasswordError &&
                values.password !== values.confirmPassword && (
                  <p className="text-[#F5821F] mt-2 text-xs">
                    Passwords do not match
                  </p>
                )}
            </div>
            <p className="text-[#A0A3BD] mt-2 text-xs">
              Password should be 8 characters minimum.
            </p>
            <br />

            {isError && (
              <p>
                Registration Error: {` `}
                <span className="text-[#ff0000]">
                  {` `} {error?.message}
                </span>
              </p>
            )}
            {isPending && (
              <p>
                Please wait: {` `}
                <span className="text-[#f1c557]">
                  {` `} Registration in process...
                </span>
              </p>
            )}
            {isSuccess && (
              <p>
                {data && data?.message}: {` `}
                <span className="text-[#00A651]">
                  {` `} Account created kindly check you mail
                </span>
              </p>
            )}
          </div>

          <Button
            variant="contained"
            style={{
              backgroundColor: `${"#00A651"}`,
              color: "#ffffff",
              opacity: `${isPending ? ".6" : "1"}`,
            }}
            type="submit"
            className="rounded-[2.5rem] md:w-64 text-base py-4 md:text-xl capitalize"
            sx={{
              "&:focus": { backgroundColor: "#00A651" },
              "&.Mui-error": { backgroundColor: "red" },
            }}
            disabled={isPending}
          >
            {isPending ? "Registring..." : "Create account"}
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default SignupForm;
