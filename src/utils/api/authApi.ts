import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor to add Bearer token to each request
authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle responses
authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // Check if the error is due to an expired access token (status code 401)
    if (error.response?.status === 401) {
      // Attempt to refresh the access token
      try {
        const currentPath = window.location.pathname;
        const refreshTokenKey = localStorage.getItem('refreshToken');
        
          console.log('an error status', error.response.status);

        if (refreshTokenKey || currentPath !== '/login') {

          console.log('an error should refresh', error.response.status);

          const refreshedToken = await refreshToken(); // Implement refreshToken function
          
          console.log('an error was refreshed', error.response.status);

          // Retry the original request with the new token
          error.config.headers.Authorization = `Bearer ${refreshedToken}`;
          return authApi(error.config);

        } else {
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // If refresh fails or there's an error, redirect to login or handle as needed
        handleAuthenticationError(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const refreshToken = async () => {
  try {
    // Implement logic to refresh the access token using the refresh token
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await authApi.post('/auth/refresh-token', { refreshToken });
    const newAccessToken = response.data.accessToken;

    // Update the access token in localStorage
    localStorage.setItem('authToken', newAccessToken);

    return newAccessToken;
  } catch (error) {
    handleAuthenticationError(error);
    throw new Error('Token refresh failed');
  }
};

const handleAuthenticationError = (error: any) => {
  console.error('Authentication error:', error);

  // Check for CORS-related errors
  if (error.message.includes('Cross-Origin Request Blocked')) {
    console.error('CORS issue. Check server configuration.');
  }

  // Check for Same-Site cookie issues
  if (error.message.includes('SameSite')) {
    console.error('Same-Site cookie issue. Check cookie configuration.');
  }

  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');

  // Redirect to login page
  window.location.href = '/login';
};

export default authApi;
