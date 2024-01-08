import { ChangePasswordRequest } from "@/utils/types/profile.type";
import authApi from "../authApi";

export async function getProfile() {
    try {
        const response = await authApi.get('/profile')

        return await response.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}

export async function changepasswordApi (changePassword: ChangePasswordRequest) {
    try {
      const response = await authApi.patch('/profile/change-password', { ...changePassword });

      return { success: true, message: response.data.message }; 
    } catch (error: any) {
        // throw new Error('ChangePassword failed:', error ?? error);
        throw new Error(error?.response?.data.message ?? error?.message)
    }
  };