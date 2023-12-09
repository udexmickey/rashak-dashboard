import authApi from "../authApi";

const baseUrl = process.env.NEXT_PUBLIC_API_URL as RequestInfo | URL

export const fetchCache = 'force-no-store';

export async function getAllTeamMember({ pageNumber, searchText, pageSize } : { pageNumber?: number, searchText?: string | number | undefined, pageSize?: number }) {
    try {
        const response = await authApi.get(`/team-member?${searchText && `searchQuery=${searchText}`}&${pageNumber && `page=${pageNumber}`}&${pageSize && `pageSize=${pageSize}`}`);
        
        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        return await response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }

}

export async function getOneTeamMember(id: any) {
    try {
        const posts = await authApi.get(`/team-member/${id}`)
        return await posts.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}