export interface NewsImageGalleryProps{
    cloudinaryPublicId:  String,
    media: string,
}

export interface NewsDataType {
  [x: string]: any;
  title: string;
  content: string;
  author: string;

  media?: string;
  mediaType?: any;
  newsType: any;
  cloudinaryPublicId?: string;

  imageGallery?: NewsImageGalleryProps[];
  youtubeLink: string;
  pressReleaseLink: string;
}
