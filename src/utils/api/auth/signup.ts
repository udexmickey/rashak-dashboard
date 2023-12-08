import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

import authApi from "../authApi";

export async function signUpApi (email: string, password: string, name: string) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, { email, password, name });

      return { success: true, message: response.data.message }; 
    } catch (error: any) {
        // throw new Error('Login failed:', error ?? error);
        throw new Error(error?.response?.data.message ?? error?.message)
    }
  };