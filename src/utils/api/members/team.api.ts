import authApi from "../authApi";
 

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

export async function getOneTeamMember(id: string) {
    try {
        const posts = await authApi.get(`/team-member/${id}`)
        return await posts.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}

export async function addTeamMember(body: any) {
    try {
      const response = await authApi.post(`/team-member/create`, { ...body }, { headers: {
            "Content-Type": "multipart/form-data",
            contentType: "multipart/form-data",
            // ...data.getHeaders(),
            maxBodyLength: Infinity
        }});

      return { success: true, message: response.data.message }; 
    } catch (error: any) {
        // throw new Error('Login failed:', error ?? error);
        throw new Error(error?.response?.data.message ?? error?.message)
    }
  };

  export async function UpdateTeamMember(id: string, data: any) {
    try {
        const posts = await authApi.patch(`/team-member/${id}`, { ...data }, { headers: {
            "Content-Type": "multipart/form-data",
            contentType: "multipart/form-data",
            // ...data.getHeaders(),
            maxBodyLength: Infinity
        }})

        return await posts.data;
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}

  export async function DeleteTeamMember(id: string) {
    try {
        const posts = await authApi.delete(`/team-member/${id}`)
        return await posts.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}