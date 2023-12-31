// loginForm.tsx
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Paper, TextField, Button } from "@mui/material";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/authentication/useLogin";

interface Values {
  email: string;
  password: string;
  showPassword: boolean;
  emailError: boolean;
  passwordError: boolean;
}

const LoginForm = () => {
  const [values, setValues] = useState<Values>({
    email: "",
    password: "",
    showPassword: false,
    emailError: false,
    passwordError: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    mutateAsync: loginFxn,
    isPending,
    isError,
    error,
    isSuccess,
    data,
    reset,
  } = useLogin();
  const router = useRouter();

  // Check if running on the client (browser) before accessing localStorage
  const redirectAfterLogin =
    typeof window !== "undefined"
      ? localStorage.getItem("redirectAfterLogin")
      : null;

  const handleLoginSuccess = () => {
    if (redirectAfterLogin) {
      // Clear the stored route
      localStorage.removeItem("redirectAfterLogin");
      router.push(redirectAfterLogin);
    } else {
      // If no stored route, redirect to a default page (e.g., dashboard)
      router.push("/dashboard");
    }
  };

  const handleChange =
    (prop: keyof Values) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      //login function from useLogin hook
      await loginFxn(values);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      handleLoginSuccess();
    }

    const timeSession = setTimeout(() => {
      reset();
    }, 3000);

    return () => clearTimeout(timeSession);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="flex flex-col items-center justify-start h-screen w-[100%] max-w-2xl isolate box-border md:gap-y-20 gap-y-10">
      <div className="flex justify-end md:w-[90%] w-[90%]">
        <Link href={"/signup"}>
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
            Create Account
          </Button>
        </Link>
      </div>
      <Paper
        elevation={0}
        className="p-8 text-center rounded-[1rem] w-full flex gap-y-6 flex-col"
      >
        <div className="mb-4">
          <label className="text-base text-left mb-2 block text-[#A0A3BD]">
            Welcome back
          </label>
          <h2 className="text-left text-3xl !text-[#00a651] ">Log in</h2>
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
          <div className="mb-4 relative">
            <label className="text-base mb-2 block text-[#A0A3BD]">
              Password
            </label>
            <div className="relative">
              <TextField
                variant="outlined"
                fullWidth
                type={showPassword ? "text" : "password"}
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
            {/* {isError && (
              <p className="text-[#F5821F] mt-2 text-xs">{error?.message}</p>
            )} */}
            {isError && (
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
                <span className="text-[#f1c557]">
                  {` `} While verify you login credentials...
                </span>
              </p>
            )}
            {isSuccess && (
              <p>
                {data && data?.message}: {` `}
                <span className="text-[#00A651]">{` `} welcome back</span>
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
            className="rounded-[2.5rem] md:w-44 w-28 text-base py-2 md:py-4 md:text-xl capitalize"
            sx={{
              "&:focus": { backgroundColor: "#00A651" },
              "&.Mui-error": { backgroundColor: "red" },
            }}
            disabled={isPending}
          >
            {isPending ? "verifying..." : "Log In"}
          </Button>
          <label className="text-xs text-left mb-2 block text-[#9f9f9f]">
            <Link href={"/forget-password"}>Forgot Password?</Link>
          </label>
        </form>
      </Paper>
    </div>
  );
};

export default LoginForm;
