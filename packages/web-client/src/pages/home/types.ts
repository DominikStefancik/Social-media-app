export type User = {
  id: string;
  username: string;
  password?: string;
  email?: string;
  createdAt?: string;
  lastUpdated?: string;
};

export type Post = {
  id: string;
  author: User | null;
  text: string;
  createdAt: string;
  lastUpdated?: string;
  comments: Comment[];
  likes: string[];
};

export type Comment = {
  id: string;
  author: User | null;
  text: string;
  createdAt: string;
};
