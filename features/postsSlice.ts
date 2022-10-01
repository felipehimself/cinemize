import { createSlice } from '@reduxjs/toolkit';
import { PostCardType, PostCard } from '../ts/types/post';

const initial: PostCard[] = [];

const postsSlice = createSlice({
  name: 'postsSlice',
  initialState: { posts: initial },
  reducers: {
    savePosts: (state, action) => {
      state.posts = action.payload;
    },
  },
});

export const { savePosts } = postsSlice.actions;

export default postsSlice.reducer

