export interface UpdateStoryProps {
  initialData: {
    author: string;
    image: File | null;
    content: string;
    youtubeLink: string;
  };
  contentId: string
}