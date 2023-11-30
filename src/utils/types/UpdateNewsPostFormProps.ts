export interface UpdateNewsPostFormProps {
  initialData: {
    title: string;
    image: File | null;
    blogContent: string;
    youtubeLink: string;
    pressReleaseLinks: string;
    relatedPictures: (File | null)[];
  };
}