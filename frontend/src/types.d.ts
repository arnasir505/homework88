export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface PostMutation {
  title: string;
  description: string | null;
  image: string | null;
}

export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface Post {
  _id: string;
  author: string;
  title: string;
  image: string;
  datetime: string;
}

export interface RegisterLoginResponse {
  user: User;
  message: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
