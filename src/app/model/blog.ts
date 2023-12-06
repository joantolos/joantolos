export interface Blog {
  pageSize: number;
  recentPostsMax: number;
  posts: Post[];
}

export interface Post {
  id: string;
  title: string;
  date: string;
  subtitle: string;
  summary: string;
  featuredImage: string;
  thumb: string;
  tags: string[];
  active: boolean;
}

export interface Category {
  name: string;
  count: number;
  selected: boolean;
}
