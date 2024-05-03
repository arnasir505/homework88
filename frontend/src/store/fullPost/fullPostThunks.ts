import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { FullPost, ValidationError } from '../../types';
import { RootState } from '../../app/store';
import { isAxiosError } from 'axios';

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

export const addComment = createAsyncThunk<
  void,
  string,
  { state: RootState; rejectValue: ValidationError }
>('fullPost/addComment', async (comment, { getState, rejectWithValue }) => {
  try {
    const token = getState().users.user?.token;
    const postId = getState().fullPost.data._id;

    const commentData = {
      comment: comment,
      post: postId,
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axiosApi.post('/comments', commentData, config);
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 422
    ) {
      return rejectWithValue(error.response.data as ValidationError);
    }
    throw error;
  }
});
