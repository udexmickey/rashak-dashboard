import authApi from "../authApi";
import { NewsDataType } from "@/utils/types/news.types";

 

interface ErrorResponse {
  message: string;
  cause?: string;
  response?: Record<string, any>;
}

export async function getOneNews(id: string) {
    try {
        const posts = await authApi.get(`/news/${id}`)
        // const newsPost =  await posts
        return await posts.data;
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}

export async function postNews(data: NewsDataType) {
    try {
        const posts = await authApi.post(`/news`, { ...data }, { headers: {
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

export async function getAllSearchNews({ pageNumber, searchText, pageSize } : { pageNumber?: number, searchText?: string | number | undefined, pageSize?: number }) {
    try {
        const response = await authApi.get(`/news?${searchText && `searchQuery=${searchText}`}&${pageNumber && `page=${pageNumber}`}&${pageSize && `pageSize=${pageSize}`}`);
        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        // const newsPosts = await response.json().then(data => data);

        return await response.data;
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}


export async function UpdateNews(id: string, data: any) {
    try {
        const posts = await authApi.patch(`/news/${id}`, { ...data }, { headers: {
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

export async function DeleteNews(id: string) {
    try {
        const posts = await authApi.delete(`/news/${id}`)
        return await posts.data; 
    } catch (error: any) {
        throw new Error(error?.response?.data.message ?? error?.message)
    }
}