import authApi from "../authApi";

export async function ReassignDepartment(id: string, department: string) {
    try {
        const posts = await authApi.patch(`/admin/assign-department/${id}?department=${department}`)
        
        return await posts.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}