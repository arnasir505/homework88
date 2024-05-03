import { createSlice } from '@reduxjs/toolkit';
import { Post } from '../../types';
import { fetchPosts } from './postsThunks';
import { RootState } from '../../app/store';

interface PostsState {
  items: Post[];
  loading: boolean;
  error: boolean;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: false,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchPosts.fulfilled, (state, { payload: posts }) => {
        state.loading = false;
        state.items = posts;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const postsReducer = postsSlice.reducer;

export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
