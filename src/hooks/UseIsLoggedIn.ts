// useAuthRedirect.ts
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface UseAuthRedirectResult {
  isLoggedIn: boolean;
  checkAuthAndRedirect: () => void;
}

const useAuthRedirect = (): UseAuthRedirectResult => {
  const router = useRouter();
  const path = usePathname();

  // Ensure localStorage is available (client-side)
  const isLocalStorageAvailable = typeof window !== 'undefined' && window.localStorage;

  const [isLoggedIn, setIsLoggedIn] = useState(
    isLocalStorageAvailable ? localStorage.getItem('authToken') !== null : false
  );

  const checkAuthAndRedirect = async () => {
    if (isLocalStorageAvailable) {
      if (localStorage.getItem('authToken') !== null) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);

        // Token is not present or expired, try refreshing
        try {
          // Simulate a successful refresh
          setIsLoggedIn(true);
        } catch (error) {
          // If refresh fails or there's an error, redirect to login
          localStorage.setItem('redirectAfterLogin', path);
          router.push('/login');
        }
      }
    }
  };

  useEffect(() => {
    checkAuthAndRedirect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLocalStorageAvailable]); // Run the effect when localStorage becomes available

  return { isLoggedIn, checkAuthAndRedirect };
};

export default useAuthRedirect;
