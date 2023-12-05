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
    } catch (error) {
      setIsLoggedIn(false);
      console.error('Login failed:', error);
      return { success: false, message: 'Login failed' };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');

    setIsLoggedIn(false);

    // Additional cleanup or redirect logic here
  };

  const refreshAccessToken = async () => {
    try {
      // Implement logic to refresh the access token using the refresh token
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await authApi.post('/auth/refresh-token', { refreshToken });
      const newAccessToken = response.data.authorization.access_token;

      // Update the access token in localStorage
      localStorage.setItem('authToken', newAccessToken);

      return { success: true, message: 'Access token refreshed successfully' };
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw new Error('Token refresh failed');
    }
  };

  return { isLoggedIn, login, logout, refreshAccessToken };
};

export default useAuth;
