export default async function sitemap() {
    const base_Url = process.env.NEXT_PUBLIC_BASE_URL;
    //todo: Add news to the sitemap

    //All the commented code is as a result of rendering sitemap to work on vercel deployment
    
  // const blogPosts = await getAllSearchBlogs({ pageNumber: 1, searchText: "" });
  // const newsPosts = await getAllSearchNews({ pageNumber: 1, searchText: "" });

  // const blogsUrls =
  //   blogPosts &&
  //   blogPosts?.map((blog: any, idx: any) => ({
  //     url: `${base_Url}/blog/${blog._id}`,
  //     lastModified: blog.updatedAt ?? new Date(),
  //   }));

  //   const newsUrls =
  //   newsPosts &&
  //   newsPosts?.map((news: any, idx: any) => ({
  //     url: `${base_Url}/news/${news._id}`,
  //     lastModified: news.updatedAt ?? new Date(),
  //   }));

  return [
    {
      url: `${base_Url}`,
      lastModified: new Date(),
    },
    {
      url: `${base_Url}/`,
      lastModified: new Date(),
    },
    {
        url: `${base_Url}/user-management`,
        lastModified: new Date(),
    },
    {
        url: `${base_Url}/content-management`,
        lastModified: new Date(),
    },
    {
        url: `${base_Url}/settings`,
        lastModified: new Date(),
    },
        // ...blogsUrls,
        // ...newsUrls,
  ];
}
