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
        className='md:h-screen relative w-full h-full bg-[floralwhite] p-2'
        style={{
          position: "relative",
          // height: 'auto', width: 'auto'
        }}
        >
          <Image
            src={backgroundImage}
            alt="Background Image"
            fill
            style={{
              objectFit: 'fill', height: '100%', width: '100%'
            }}
            sizes="100%"
            priority
            className="hidden md:flex flex-col h-auto w-auto mix-blend-darken"
          />
          <div className='absolute top-8 left-16 bg-[floralwhite] p-2'>
            <Image 
                src="/logo.svg" 
                alt="Logo" 
                width={145} 
                height={100} 
                className='mix-blend-darken'
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