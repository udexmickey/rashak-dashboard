import authApi from "../authApi";

export async function ReassignDepartment(id: any, department: string) {
    try {
        const posts = await authApi.patch(`/admin/assign-department/${id}`, department)
        return await posts.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}

