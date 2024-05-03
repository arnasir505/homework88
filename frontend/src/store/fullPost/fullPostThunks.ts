import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { FullPost } from '../../types';

export const fetchFullPost = createAsyncThunk<FullPost, string>(
  'fullPost/fetch',
  async (id) => {
    try {
      const response = await axiosApi.get<FullPost>(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
