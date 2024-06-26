export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface PostMutation {
  title: string;
  description: string | null;
  image: string | null;
  datetime: string;
  author: string;
}

export interface CommentMutation {
  author: string;
  post: string;
  comment: string;
  datetime: string;
}
