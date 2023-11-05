'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ProtectedRoute = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const router = useRouter();

    // Simulating authentication authentication logic
    const userAuthenticated = true;

    useEffect(() => {
      if (!userAuthenticated) {
        router.push('/login');
      }
    }, [userAuthenticated, router]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default ProtectedRoute;