import authApi from "../authApi";

 

interface ErrorResponse {
  message: string;
  cause?: string;
  response?: Record<string, any>;
}

export async function getOneBlog(id: string) {
    try {
        const posts = await authApi.get(`/blogs/${id}`)
        // const blogPost =  await posts
        return await posts.data;
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}

export async function postBlog(data: any) {
    try {
        const posts = await authApi.post(`/blogs`, { ...data }, { headers: {
            "Content-Type": "multipart/form-data",
            contentType: "multipart/form-data",
            // ...data.getHeaders(),
            maxBodyLength: Infinity
        }})

        if (posts.status !== 201) {
        // Handle non-successful response
        throw new Error(`Failed to post data: ${posts?.data?.message}`);
      }

        return await posts.data;
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}

export async function getAllSearchBlog({ pageNumber, searchText, pageSize } : { pageNumber?: number, searchText?: string | number | undefined, pageSize?: number }) {
    try {
        const response = await authApi.get(`/blogs?${searchText && `searchQuery=${searchText}`}&${pageNumber && `page=${pageNumber}`}&${pageSize && `pageSize=${pageSize}`}`);
        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        // const blogPosts = await response.json().then(data => data);

        return await response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}

export async function UpdateBlog(id: string, data: any) {
    try {
        const posts = await authApi.patch(`/blogs/${id}`, { ...data }, { headers: {
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

export async function DeleteBlog(id: string) {
    try {
        const posts = await authApi.delete(`/blogs/${id}`)
        return await posts.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}