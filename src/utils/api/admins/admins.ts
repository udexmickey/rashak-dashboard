import authApi from "../authApi";

 

export async function getOneAdmin(id: any) {
    try {
        const posts = await authApi.get(`/admin/${id}`)
        return await posts.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}

export async function getAllSearchAdmins({ pageNumber, searchText, pageSize } : { pageNumber?: number, searchText?: string | number | undefined, pageSize?: number }) {
    try {
        const response = await authApi.get(`/admin?${searchText && `searchQuery=${searchText}`}&${pageNumber && `page=${pageNumber}`}&${pageSize && `pageSize=${pageSize}`}`);
        
        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        return await response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }

}