"use client";
import AuthLayout from "@/components/authentication/auth.layout";
import LoginForm from "@/components/authentication/loginForm";
import React from "react";

export default function Signup() {
  return (
    <AuthLayout backgroundImage="/sign_up_girl.png">
      <LoginForm />
    </AuthLayout>
  );
}
