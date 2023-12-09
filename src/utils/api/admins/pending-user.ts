import authApi from "../authApi";

export const fetchCache = 'force-no-store';

export async function getOnePendingUser(id: any) {
    try {
        const posts = await authApi.get(`/users/${id}`)
        return await posts.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}

export async function getAllSearchPendingUsers({ pageNumber, searchText, pageSize } : { pageNumber?: number, searchText?: string | number | undefined, pageSize?: number }) {
    try {
        const response = await authApi.get(`/admin/pending-users?${searchText && `searchQuery=${searchText}`}&${pageNumber && `page=${pageNumber}`}&${pageSize && `pageSize=${pageSize}`}`);
        
        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        return await response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }

}