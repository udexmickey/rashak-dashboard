"use client";
import authApi from "../authApi";

export async function resetpasswordApi (token: string, newPassword: string) {
    try {
      const response = await authApi.post('/auth/reset-password', { token, newPassword, });

      return { success: true, message: response.data.message }; 
    } catch (error: any) {
        // throw new Error('ResetPassword failed:', error ?? error);
        throw new Error(error?.response?.data.message ?? error?.message)
    }
  };