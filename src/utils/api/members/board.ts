import authApi from "../authApi";

export async function getAllBoardMember({ pageNumber, searchText, pageSize } : { pageNumber?: number, searchText?: string | number | undefined, pageSize?: number }) {
    try {
        const response = await authApi.get(`/board-member?${searchText && `searchQuery=${searchText}`}&${pageNumber && `page=${pageNumber}`}&${pageSize && `pageSize=${pageSize}`}`);
        
        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        return await response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }

}

export async function getOneBoardMember(id: string) {
    try {
        const posts = await authApi.get(`/board-member/${id}`)
        return await posts.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}

export async function addBoardMember(body: any) {
    try {
      const response = await authApi.post(`/board-member/create`, { ...body }, { headers: {
            "Content-Type": "multipart/form-data",
            contentType: "multipart/form-data",
            // ...data.getHeaders(),
            maxBodyLength: Infinity
        }});
      console.log('file name changed api', body.file);
      console.log('body changed api', body);

      return { success: true, message: response.data.message }; 
    } catch (error: any) {
        // throw new Error('Login failed:', error ?? error);
        throw new Error(error?.response?.data.message ?? error?.message)
    }
  };