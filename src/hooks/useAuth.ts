// useAuth.ts
import authApi from '@/utils/api/authApi';
import { useState } from 'react';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.post('/auth/login', { email, password });

      const token = response.data.authorization.access_token;
      const refreshToken = response.data.authorization.refresh_token.refreshToken;

      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);

      setIsLoggedIn(true);

      return { success: true, message: response.data.message };
    } catch (error: any) {
      setIsLoggedIn(false);
      // throw new Error('Login failed:', error.message);
      return { success: false, message: `Login failed: ${error.message}` };
    }
  };

  const logout = async () => {
    const response = await authApi.post('/auth/logout');

    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    
    setIsLoggedIn(false);
    return { success: true, message: response.data.message };
  };

  return { isLoggedIn, login, logout };
};

export default useAuth;
