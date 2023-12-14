import authApi from "../authApi";

export async function getProfile() {
    try {
        const response = await authApi.get('/profile')

        return await response.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}