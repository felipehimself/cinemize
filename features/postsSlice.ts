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
    addPost: (state, action) => {
      state.posts.push(action.payload)
    }
  },
});

export const { savePosts, addPost } = postsSlice.actions;

export default postsSlice.reducer

