import SignupForm from '@/app/(Authentication)/components/signupForm';
import { Grid } from '@mui/material';
import Image from 'next/image';
import React from 'react';

export default function Login() {
  return (
    <Grid container className="bg-white">
      <Grid item xs={12} sm={6}>
        <div
        className='md:h-screen relative'
        >
          <Image
            src="/farmer.png"
            alt="Background Image"
            // layout="fill"
            width={840}
            height={850}
            objectFit="cover"
            className="md:h-[100vh] hidden md:flex flex-col"
          />
          <div className='absolute top-8 left-6 md:left-16 max-h-5'>
            <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={145} 
                height={100} 
            />
          </div>
        </div>
      </Grid>
      {/* form */}
      <Grid item xs={12} sm={6}>
        <div className="h-[100vh] mt-6 flex justify-center items-center">
          <SignupForm />
        </div>
      </Grid>
    </Grid>
  );
}
