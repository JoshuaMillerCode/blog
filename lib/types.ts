export interface GlobalData {
  metadata: {
    site_title: string;
    site_tag: string;
  };
}

export interface Admin {
  _id: string;
  username: string;
}

export interface Post {
  _id: string;
  slug: string;
  title: string;
  published_date: string;
  content: string;
  hero?: {
    img_url?: string;
  };
  author?: {
    id: string;
    slug?: string;
    title?: string;
    image?: {
      img_url?: string;
    };
  };
  teaser: string;
  categories: {
    title: string;
  }[];
}
