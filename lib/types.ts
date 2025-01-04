export interface GlobalData {
  metadata: {
    site_title: string;
    site_tag: string;
  };
}

export interface Admin {
  _id: string;
  username: string;
  password: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  metadata: {
    published_date: string;
    content: string;
    hero?: {
      img_url?: string;
    };
    author?: {
      id: string;
      slug?: string;
      title?: string;
      metadata: {
        image?: {
          img_url?: string;
        };
      };
    };
    teaser: string;
    categories: {
      title: string;
    }[];
  };
}

export interface Author {
  id: string;
  slug: string;
  title: string;
  metadata: {
    image?: {
      imgix_url?: string;
    };
  };
}
