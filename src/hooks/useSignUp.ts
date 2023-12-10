"use client";
import { signUpApi } from "@/utils/api/auth/signup";
import { useMutation } from "@tanstack/react-query";

export const useSignUp = () => {
  const signUpMutation = useMutation({
    mutationFn: async (body: any) =>
      await signUpApi(body.email, body.password, body.name),

    onSuccess: (data: any) => {
      // Handle success if needed
      // After successful signup
      localStorage.setItem("isRegistered", "true");
    },
    onError: (error: any) => {
      // Handle error if needed
    },
  });

  return signUpMutation;
};
