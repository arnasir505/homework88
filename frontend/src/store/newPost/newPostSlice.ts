import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GlobalError, PostMutation } from '../../types';
import { RootState } from '../../app/store';
import { addNewPost } from './newPostThunks';

interface NewPostState {
  data: PostMutation;
  filename: string;
  loading: boolean;
  error: GlobalError | null;
}

const initialState: NewPostState = {
  data: {
    title: '',
    description: '',
    image: null,
  },
  filename: '',
  loading: false,
  error: null,
};

const newPostSlice = createSlice({
  name: 'newPost',
  initialState,
  reducers: {
    updateTitle: (state, { payload: title }: PayloadAction<string>) => {
      state.data.title = title;
    },
    updateDescription: (
      state,
      { payload: description }: PayloadAction<string>
    ) => {
      state.data.description = description;
    },
    updateImage: (state, { payload: image }: PayloadAction<string>) => {
      state.data.image = image;
    },
    updateFilename: (state, { payload: filename }: PayloadAction<string>) => {
      state.filename = filename;
    },
    clearForm: (state) => {
      state.data = { title: '', description: '', image: null };
      state.filename = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNewPost.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(addNewPost.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addNewPost.rejected, (state, { payload: error }) => {
        state.loading = false;
        state.error = error || null;
      });
  },
});

export const newPostReducer = newPostSlice.reducer;
export const {
  updateTitle,
  updateDescription,
  updateImage,
  updateFilename,
  clearForm,
} = newPostSlice.actions;

export const selectNewPost = (state: RootState) => state.newPost.data;
export const selectNewPostImageName = (state: RootState) =>
  state.newPost.filename;
export const selectNewPostSubmitLoading = (state: RootState) =>
  state.newPost.loading;
export const selectNewPostError = (state: RootState) => state.newPost.error;
