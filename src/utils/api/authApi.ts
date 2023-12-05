import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const currentPath = window.location.pathname;

const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
  async (error: any) => {
    // Check if the error is due to an expired access token (status code 401)
    if (error.response?.status === 401) {
      // Attempt to refresh the access token
      try {
        const refreshedToken = currentPath !== '/login' && await refreshToken(); // Implement refreshToken function
        // Retry the original request with the new token
        error.config.headers.Authorization = `Bearer ${refreshedToken}`;
        return authApi(error.config);
      } catch (refreshError) {
        // If refresh fails or there's an error, redirect to login or handle as needed
        return Promise.reject(refreshError);
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
      const newAccessToken = response.data.authorization.access_token;

      // Update the access token in localStorage
      localStorage.setItem('authToken', newAccessToken);

      return { success: true, message: 'Access token refreshed successfully' };
    } catch (error: any) {        

      window.location.href = '/login';
      throw new Error('Token refresh failed', error);
    }
  };

export default authApi;
