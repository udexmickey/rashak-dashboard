import { BlogImageGalleryProps } from "./PostData.types";

export interface UpdateBlogProps {
  initialData: {
    title: string;
    image: File | null;
    content: string;
    youtubeLink: string;
    pressReleaseLink: string;
    imageGallery: (File | null | BlogImageGalleryProps)[];
  };
  contentId: string
}