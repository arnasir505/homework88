import { createSlice } from '@reduxjs/toolkit';
import { Comment, FullPost, ValidationError } from '../../types';
import { RootState } from '../../app/store';
import { fetchFullPost } from './fullPostThunks';

interface FullPostState {
  data: FullPost;
  comments: Comment[];
  loading: boolean;
  commentsLoading: boolean;
  commentsError: ValidationError | null;
}

const initialState: FullPostState = {
  data: {
    _id: '',
    author: {
      _id: '',
      username: '',
    },
    title: '',
    image: null,
    datetime: '',
    description: null,
  },
  comments: [],
  loading: false,
  commentsLoading: false,
  commentsError: null,
};

const fullPostSlice = createSlice({
  name: 'fullPost',
  initialState,
  reducers: {
    clearFullPost: (state) => {
      state.data = {
        _id: '',
        author: {
          _id: '',
          username: '',
        },
        title: '',
        image: null,
        datetime: '',
        description: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFullPost.pending, (state) => {
        state.loading = true;
        state.commentsError = null;
      })
      .addCase(fetchFullPost.fulfilled, (state, { payload: fullPost }) => {
        state.loading = false;
        state.data = fullPost;
      })
      .addCase(fetchFullPost.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const fullPostReducer = fullPostSlice.reducer;
export const { clearFullPost } = fullPostSlice.actions;

export const selectFullPost = (state: RootState) => state.fullPost.data;
export const selectFullPostComments = (state: RootState) =>
  state.fullPost.comments;
export const selectFullPostLoading = (state: RootState) =>
  state.fullPost.loading;
export const selectFullPostCommentsLoading = (state: RootState) =>
  state.fullPost.commentsLoading;
export const selectFullPostCommentError = (state: RootState) =>
  state.fullPost.commentsError;
