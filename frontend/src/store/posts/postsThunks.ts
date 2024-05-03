import { createAsyncThunk } from '@reduxjs/toolkit';
import { Post } from '../../types';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { clearFullPost } from '../fullPost/fullPostSlice';

export const fetchPosts = createAsyncThunk<Post[], undefined, {state: RootState}>(
  'posts/fetchAll',
  async (_, { dispatch}) => {
    try {
      const response = await axiosApi.get<Post[]>('/posts');
      dispatch(clearFullPost());
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
