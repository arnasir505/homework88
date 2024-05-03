import { createSlice } from '@reduxjs/toolkit';
import { Comment, FullPost, ValidationError } from '../../types';
import { RootState } from '../../app/store';
import { addComment, fetchFullPost } from './fullPostThunks';

interface FullPostState {
  data: FullPost;
  comments: Comment[];
  loading: boolean;
  error: boolean;
  commentSubmitLoading: boolean;
  commentSubmitError: ValidationError | null;
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
  error: false,
  commentSubmitLoading: false,
  commentSubmitError: null,
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
        state.error = false;
      })
      .addCase(fetchFullPost.fulfilled, (state, { payload: fullPost }) => {
        state.loading = false;
        state.data = fullPost;
      })
      .addCase(fetchFullPost.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });

    builder
      .addCase(addComment.pending, (state) => {
        state.commentSubmitLoading = true;
        state.commentSubmitError = null;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.commentSubmitLoading = false;
      })
      .addCase(addComment.rejected, (state, { payload: error }) => {
        state.commentSubmitLoading = false;
        state.commentSubmitError = error || null;
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
export const selectFullPostError = (state: RootState) => state.fullPost.error;
export const selectFullPostCommentSubmitLoading = (state: RootState) =>
  state.fullPost.commentSubmitLoading;
export const selectFullPostCommentSubmitError = (state: RootState) =>
  state.fullPost.commentSubmitError;
