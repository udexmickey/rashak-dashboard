import authApi from "../authApi";

export async function ApprovePendingUser(id: string) {
    try {
        const posts = await authApi.post(`/admin/register-admin/${id}`)
        return await posts.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}

export async function DeletePendingUser(id: string) {
    try {
        const posts = await authApi.delete(`/users/${id}`)
        return await posts.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}
