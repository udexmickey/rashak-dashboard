import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface UseAuthRedirectResult {
  isLoggedIn: boolean;
  checkAuthAndRedirect: () => void;
}

const useAuthRedirect = (): UseAuthRedirectResult => {
  const router = useRouter();
  const path = usePathname();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkAuthAndRedirect = () => {
    // Implement your logic to check if the user is logged in
    // For example, you might check if there's a valid authentication token
    const isAuthenticated = localStorage.getItem('isLoggedIn') !== null;
    
    setIsLoggedIn(isAuthenticated);

    // If not logged in or token has expired, redirect to login
    if (!isAuthenticated) {
      // Save the current route in localStorage for redirection after login
      localStorage.setItem('redirectAfterLogin', path);
      router.push('/login');
    }
  };

  useEffect(() => {
    checkAuthAndRedirect();
  }, [checkAuthAndRedirect]); // Check login status on component mount

  return { isLoggedIn, checkAuthAndRedirect };
};

export default useAuthRedirect;
