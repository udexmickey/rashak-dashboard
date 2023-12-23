"use client";
import authApi from "../authApi";

export async function forgetpasswordApi (email: string) {
    try {
      const response = await authApi.post('/auth/forgot-password', { email, });

      return { success: true, message: response.data.message }; 
    } catch (error: any) {
        // throw new Error('ForgetPassword failed:', error ?? error);
        throw new Error(error?.response?.data.message ?? error?.message)
    }
  };