import AuthLayout from '@/components/authentication/auth.layout';
import SignupForm from '@/components/authentication/signupForm';
import React from 'react';

export default function Login() {
  return (
        <AuthLayout backgroundImage="/farmer.png" >
        <SignupForm />
      </AuthLayout>
  );
}
