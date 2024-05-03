import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../types';
import axiosApi from '../../axiosApi';

export const fetchPosts = createAsyncThunk<Post[]>(
  'posts/fetchAll',
  async () => {
    try {
      const response = await axiosApi.get<Post[]>('/posts');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
