import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { GlobalError } from '../../types';
import { blobUrlToFile } from '../../constants';
import { isAxiosError } from 'axios';
import { RootState } from '../../app/store';

export const addNewPost = createAsyncThunk<
  void,
  undefined,
  { state: RootState; rejectValue: GlobalError }
>('newPost/add', async (_, { getState, rejectWithValue }) => {
  try {
    const title = getState().newPost.data.title;
    const description = getState().newPost.data.description;
    const image = getState().newPost.data.image;
    const token = getState().users.user?.token;

    const formData = new FormData();

    formData.append('title', title);

    if (description) {
      formData.append('description', description);
    }

    if (image) {
      const imageAsFile = await blobUrlToFile(image);
      formData.append('image', imageAsFile);
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    await axiosApi.post('/posts', formData, config);
  } catch (error) {
    if (
      isAxiosError(error) &&
      error.response &&
      error.response.status === 400
    ) {
      return rejectWithValue(error.response.data as GlobalError);
    }

    throw error;
  }
});
