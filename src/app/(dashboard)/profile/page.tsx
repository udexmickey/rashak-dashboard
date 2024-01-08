"use client";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, List, ListItem, ListItemText, TextField } from "@mui/material";
import BackgroundLetterAvatars from "@/components/menu/stringAvatar";
import { useChangePassword, useFetchOneprofile } from "@/hooks/useProfile";
import { ChangePasswordRequest } from "@/utils/types/profile.type";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface ProfileValues {
  name: string;
  confirmPassword: string;
  newPassword: string;
  showPassword: boolean;
  nameError: boolean;
  newPasswordError: boolean;
  confirmPasswordError: boolean;
}

export default function Profile() {
  const {
    data: usermanagementData,
    isLoading,
    isError,
    error,
  } = useFetchOneprofile();

  const [profilevalues, setProfileValues] = useState<ProfileValues>({
    name: "",
    confirmPassword: "",
    newPassword: "",
    showPassword: false,
    nameError: false,
    newPasswordError: false,
    confirmPasswordError: false,
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    mutateAsync: changepasswordFxn,
    isPending,
    isError: isErrorChangePassword,
    error: errorChangePassword,
    isSuccess,
    data,
    reset,
  } = useChangePassword();

  const handleChange =
    (prop: keyof ProfileValues) => (event: ChangeEvent<HTMLInputElement>) => {
      setProfileValues({ ...profilevalues, [prop]: event.target.value });
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      //changepassword function from useChangePassword hook
      const changePasswordPayload: ChangePasswordRequest = {
        // oldPassword: usermanagementData && usermanagementData?.password,
        newPassword: profilevalues.newPassword,
      };

      // Password validation (minimum 8 characters)
      if (profilevalues.newPassword.length < 8) {
        setProfileValues({ ...profilevalues, newPasswordError: true });
        return;
      }

      // Confirm Password validation
      if (profilevalues.newPassword !== profilevalues.confirmPassword) {
        setProfileValues({ ...profilevalues, confirmPasswordError: true });
        return;
      }

      await changepasswordFxn(profilevalues);
    } catch (error: any) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    const timeSession = setTimeout(() => {
      reset();
    }, 3000);

    return () => clearTimeout(timeSession);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <div className="">
      <div className="flex flex-col bg-white max-w-4xl w-full rounded-3xl gap-6 p-8">
        <div className="w-full flex gap-12 flex-col">
          <BackgroundLetterAvatars
            name={usermanagementData && usermanagementData.name}
            width={"9rem"}
            height={"9rem"}
            fontSize={"3rem"}
          />
          <form
            className="text-left flex gap-y-6 flex-col"
            onSubmit={handleSubmit}
          >
            <List
              sx={{
                width: "100%",
                maxWidth: 600,
                minWidth: 360,
                alignItems: "center",
                justifyContent: "left",
                bgcolor: "background.paper",
              }}
            >
              <ListItem>
                <ListItemText primary="Name:" />
                {/* <ListItemText
                  primary={usermanagementData && usermanagementData?.name}
                /> */}

                <div className="mb-4 w-96 relative">
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    placeholder="Enter your full name"
                    required
                    value={usermanagementData && usermanagementData?.name}
                    size="medium"
                    onChange={handleChange("name")}
                    InputProps={{
                      classes: {
                        root: "border-none h-10 text-base",
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                  />
                </div>
              </ListItem>
              <ListItem sx={{ justifyContent: "left", display: "flex" }}>
                <ListItemText primary="Department:" />
                {/* <ListItemText
                  primary={usermanagementData && usermanagementData?.department}
                  style={{ justifyContent: "left", justifySelf: "left" }}
                /> */}
                <div className="mb-4 w-96 relative">
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    placeholder="department"
                    required
                    value={
                      usermanagementData &&
                      `${usermanagementData?.department} Department`
                    }
                    size="medium"
                    // onChange={handleChange("department")}
                    InputProps={{
                      classes: {
                        root: "border-none h-10 text-base",
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                  />
                </div>
              </ListItem>
              <ListItem>
                <ListItemText primary="Email Address:" />
                {/* <ListItemText
                  primary={usermanagementData && usermanagementData?.email}
                /> */}
                <div className="mb-4 w-96 relative">
                  <TextField
                    variant="outlined"
                    fullWidth
                    type="text"
                    placeholder="email"
                    required
                    value={usermanagementData && `${usermanagementData?.email}`}
                    size="medium"
                    // onChange={handleChange("department")}
                    InputProps={{
                      classes: {
                        root: "border-none h-10 text-base",
                      },
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled
                  />
                </div>
              </ListItem>
              <ListItem>
                <ListItemText primary="New Password:" />
                <div className="relative mt-4 w-96">
                  <div className="relative">
                    <TextField
                      variant="outlined"
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      required
                      value={profilevalues.newPassword}
                      size="medium"
                      onChange={handleChange("newPassword")}
                      InputProps={{
                        classes: {
                          root: "border-none h-10 text-base",
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={profilevalues.newPasswordError}
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor: profilevalues.newPasswordError
                              ? "#F5821F"
                              : "#00A651",
                          },
                      }}
                    />
                    {profilevalues.newPasswordError ? (
                      <p className="text-[#F5821F] mt-2 text-xs">
                        Password must be at least 8 characters long with
                        uppercase letters, numbers, and symbols.
                      </p>
                    ) : (
                      <p className="text-[#A0A3BD] mt-2 text-xs">
                        Password should be minimum of 8 characters, including
                        uppercase letters, numbers, and symbols.
                      </p>
                    )}
                  </div>
                </div>
              </ListItem>
              <ListItem>
                <ListItemText primary="Confirm Password:" />
                <div className="mb-4 relative w-96">
                  <div className="relative">
                    <TextField
                      variant="outlined"
                      fullWidth
                      type={showPassword ? "text" : "password"}
                      placeholder="Confirm your new password"
                      required
                      value={profilevalues.confirmPassword}
                      size="medium"
                      onChange={handleChange("confirmPassword")}
                      InputProps={{
                        classes: {
                          root: "border-none h-10 text-base",
                        },
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      error={profilevalues.confirmPasswordError}
                      sx={{
                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                          {
                            borderColor:
                              profilevalues.confirmPasswordError &&
                              profilevalues.newPassword !==
                                profilevalues.confirmPassword
                                ? "#F5821F"
                                : "#00A651",
                          },
                      }}
                    />
                    {profilevalues.confirmPasswordError &&
                      profilevalues.newPassword !==
                        profilevalues.confirmPassword && (
                        <p className="text-[#F5821F] mt-2 text-xs">
                          Passwords do not match
                        </p>
                      )}
                  </div>
                </div>
              </ListItem>
            </List>

            {isErrorChangePassword && (
              <p>
                Error: {` `}
                <span className="text-[#ff0000]">
                  {` `} {errorChangePassword?.message}
                </span>
              </p>
            )}
            {isPending && (
              <p>
                Please wait: {` `}
                <span className="text-[#f1c557]">
                  {` `} While profile is updating...
                </span>
              </p>
            )}
            {isSuccess && (
              <p>
                {data && data?.message}: {` `}
                <span className="text-[#00A651]">{` `} Profile Updated</span>
              </p>
            )}

            {/* // action buttons */}
            <div className="flex items-center justify-between">
              <div
                className="cursor-pointer flex gap-x-2 items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                Show Password:
                {showPassword ? (
                  <BsEye size={20} onClick={() => setShowPassword(false)} />
                ) : (
                  <BsEyeSlash size={24} onClick={() => setShowPassword(true)} />
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
                className="rounded-3xl w-28 text-base md:text-xl capitalize"
                sx={{
                  "&:focus": { backgroundColor: "#00A651" },
                  "&.Mui-error": { backgroundColor: "red" },
                }}
                disabled={isPending}
              >
                {isPending ? "updating..." : "Save"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
