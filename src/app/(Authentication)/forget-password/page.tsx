import AuthLayout from '@/components/authentication/auth.layout';
import ForgetPasswordForm from '@/components/authentication/ForgetPasswordForm';
import React from 'react';

export default function Signup() {
  
  return (
    <AuthLayout backgroundImage="/sign_up_girl.png" >
      <ForgetPasswordForm />
    </AuthLayout>
  );
}
