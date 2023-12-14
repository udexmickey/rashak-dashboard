import authApi from "../authApi";

 

interface ErrorResponse {
  message: string;
  cause?: string;
  response?: Record<string, any>;
}

export async function getOneStory(id: string) {
    try {
        const posts = await authApi.get(`/stories/${id}`)
        // const storyPost =  await posts
        return await posts.data;
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}

export async function postStory(data: any) {
    try {
        const posts = await authApi.post(`/stories`, { ...data }, { headers: {
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

export async function getAllSearchStory({ pageNumber, searchText, pageSize } : { pageNumber?: number, searchText?: string | number | undefined, pageSize?: number }) {
    try {
        const response = await authApi.get(`/stories?${searchText && `searchQuery=${searchText}`}&${pageNumber && `page=${pageNumber}`}&${pageSize && `pageSize=${pageSize}`}`);
        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        // const storyPosts = await response.json().then(data => data);

        return await response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}

export async function DeleteStory(id: string) {
    try {
        const posts = await authApi.delete(`/stories/${id}`)
        return await posts.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}