import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { FullPost } from '../../types';
import { RootState } from '../../app/store';

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

export const addComment = createAsyncThunk<void, string, { state: RootState }>(
  'fullPost/addComment',
  async (comment, { getState }) => {
    try {
      const token = getState().users.user?.token;
      const postId = getState().fullPost.data._id;

      const commentData = {
        body: comment,
        post: postId,
      };

      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      await axiosApi.post('/comments', commentData, config);
    } catch (error) {
      throw error;
    }
  }
);
