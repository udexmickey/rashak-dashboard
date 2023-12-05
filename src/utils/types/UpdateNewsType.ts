import { NewsImageGalleryProps } from "./PostData.types";

export interface UpdateNewsProps {
  initialData: {
    title: string;
    media: File | null;
    content: string;
    youtubeLink: string;
    pressReleaseLink: string;
    imageGallery: (File | null | NewsImageGalleryProps)[];
  };
  contentId: string
}