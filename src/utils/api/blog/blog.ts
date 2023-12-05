const baseUrl = process.env.NEXT_PUBLIC_TEST_URL as RequestInfo | URL

export const fetchCache = 'force-no-store';

export async function getOneBlog(id: any) {
    try {
        const posts = await fetch(`${baseUrl}/blogs/${id}`, {
            next: {
                revalidate: 3600, tags: ['blogs']
            },
        })
        const blogsPost =  await posts.json().then(data => data)
        return await blogsPost 
    } catch (error: any) {
        throw new Error(error.message || error.cause || error)
    }
}

export async function getAllSearchBlogs({ pageNumber, searchText, pageSize } : { pageNumber?: number, searchText?: string | number | undefined, pageSize?: number }) {
    try {
        const response = await fetch(`${baseUrl}/blogs?${searchText && `searchQuery=${searchText}`}&${pageNumber && `page=${pageNumber}`}&${pageSize && `pageSize=${pageSize}`}`);
        if (response.status !== 200) {
            throw new Error(`Request failed with status code ${response.status}`);
        }

        const blogsPosts = await response.json().then(data => data);

        return await blogsPosts;
    } catch (error: any) {
        throw new Error(error.message || error);
    }

}