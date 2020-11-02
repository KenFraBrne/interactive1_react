export interface Image {
  id: string;
  title: string;
  description: string;
  publishedOn: string;
  authorScreenName: string;
  thumbnailUrls: {
    imedia_300: string;
    imedia_1024: string;
    imedia_2048: string;
  }
}
