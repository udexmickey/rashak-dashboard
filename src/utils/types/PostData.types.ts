import { Url } from "url";
import { MediaTypeEnum } from "../enum/mediaType.enum";

export interface PostData {
    title: string;
    image: File | null;
    blogContent: string;
    youtubeLink: string;
    pressReleaseLink: string;
    relatedPictures: (File | null | NewsImageGalleryProps)[];
}

export interface NewsImageGalleryProps{
    cloudinaryPublicId: { type: String },
    media: string,
}

export interface BlogImageGalleryProps{
    cloudinaryPublicId: { type: String },
    image: string,
}

export interface postUpload {
    author: string;
    cloudinaryPublicId: string;
    content: string;
    createdAt: string | number | Date;
    media: string | Url;
    image: string | Url;
    imageGallery: NewsImageGalleryProps[] | BlogImageGalleryProps[] | [];
    newsType: MediaTypeEnum;
    title: string;
    updatedAt: string | Date | number;
    _id: string;
    youtubeLink: string;
    pressReleaseLink: string;
}
