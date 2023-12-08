import authApi from "../authApi";

export async function loginApi (email: string, password: string) {
    try {
      const response = await authApi.post('/auth/login', { email, password });

      const token = response.data.authorization.access_token;
      const refreshToken = response.data.authorization.refresh_token.refreshToken;

      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', refreshToken);

      return { success: true, message: response.data.message }; 
    } catch (error: any) {
        // throw new Error('Login failed:', error ?? error);
        throw new Error(error?.response?.data.message ?? error?.message)
    }
  };