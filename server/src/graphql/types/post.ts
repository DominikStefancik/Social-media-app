export interface PostSelector {
  id: string;
}

export interface PostFilter {
  id_in?: string[];
  authorId?: string;
  authorId_in?: string[];
  createdFrom?: Date;
  createdTo?: Date;
}

export interface CreatePostData {
  text: string;
}
