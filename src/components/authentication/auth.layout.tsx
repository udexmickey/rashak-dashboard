import LoginForm from '@/components/authentication/loginForm';
import { Grid } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode;
    backgroundImage: string;
}

const AuthLayout : React.FC<AuthLayoutProps> = ({ children, backgroundImage }) => {
  return (
    <Grid container className="bg-white">
      <Grid item xs={12} sm={6}>
        <div
        className='md:h-screen relative'
        >
          <Image
            src={backgroundImage}
            alt="Background Image"
            layout="fill"
            // width={840}
            // height={850}
            objectFit="fill"
            className="md:h-[100vh] hidden md:flex flex-col object-fill"
          />
          <div className='absolute top-8 left-16'>
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
          {children}
        </div>
      </Grid>
    </Grid>
  );
}

export default AuthLayout;