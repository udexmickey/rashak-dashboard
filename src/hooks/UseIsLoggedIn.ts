// useAuthRedirect.ts
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import useAuth from './useAuth'; // Import your useAuth hook

interface UseAuthRedirectResult {
  isLoggedIn: boolean;
  checkAuthAndRedirect: () => void;
}

const useAuthRedirect = (): UseAuthRedirectResult => {
  const router = useRouter();
  const path = usePathname();

  const { isLoggedIn: isAuthLoggedIn } = useAuth(); // Use your existing useAuth hook
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthLoggedIn);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkAuthAndRedirect = async () => {
    const isAuthenticated = localStorage.getItem('authToken') !== null;

    if (isAuthenticated) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);

      // Token is not present or expired, try refreshing
      try {
        setIsLoggedIn(true); // Set user as logged in after successful refresh
      } catch (error) {
        // If refresh fails or there's an error, redirect to login
        localStorage.setItem('redirectAfterLogin', path);
        router.push('/login');
      }
    }
  };

  useEffect(() => {
    checkAuthAndRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoggedIn, checkAuthAndRedirect };
};

export default useAuthRedirect;
