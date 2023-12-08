import authApi from "../authApi";

const baseUrl = process.env.NEXT_PUBLIC_API_URL as RequestInfo | URL

export const fetchCache = 'force-no-store';

export async function getProfile() {
    try {
        const response = await authApi.get('/profile')

        return await response.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}