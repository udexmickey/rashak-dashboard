import AuthLayout from '@/components/authentication/auth.layout';
import ResetPasswordForm from '@/components/authentication/resetPasswordForm';
import React from 'react';

export default function Signup() {
  return (
    <AuthLayout backgroundImage="/sign_up_girl.png" >
      {/* <ResetPasswordForm params={ params: { 'resetpasswordId' } }/> */}
    </AuthLayout>
  );
}
