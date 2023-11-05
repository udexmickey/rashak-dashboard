import AuthLayout from "@/components/authentication/auth.layout";
import ResetPasswordForm from "@/components/authentication/resetPasswordForm";
import React from "react";

export default function Signup() {
  const param = { resetpasswordId: '' }
  return (
    <AuthLayout backgroundImage="/sign_up_girl.png">
      <ResetPasswordForm
      params={param}
      />
    </AuthLayout>
  );
}
