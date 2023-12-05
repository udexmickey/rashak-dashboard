const baseUrl = process.env.NEXT_PUBLIC_API_URL as RequestInfo | URL

export const fetchCache = 'force-no-store';

export async function getOneNews(id: any) {
    try {
        const posts = await fetch(`${baseUrl}/news/${id}`, {
            next: {
                revalidate: 3600, tags: ['news']
            },
        })
        const newsPost =  await posts.json().then(data => data)
        return await newsPost 
    } catch (error: any) {
        throw new Error(error.message || error.cause || error)
    }
}

export async function getAllSearchNews({ pageNumber, searchText, pageSize } : { pageNumber?: number, searchText?: string | number | undefined, pageSize?: number }) {
    try {
        const response = await fetch(`${baseUrl}/news?${searchText && `searchQuery=${searchText}`}&${pageNumber && `page=${pageNumber}`}&${pageSize && `pageSize=${pageSize}`}`);
        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        const newsPosts = await response.json().then(data => data);

        return await newsPosts;
    } catch (error: any) {
        throw new Error(error.message || error);
    }

}