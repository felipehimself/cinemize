import { createSlice,  } from '@reduxjs/toolkit';
import { PostCard } from '../ts/types/post';

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
    },  
    deletePost: (state,action) => {
      const postsCopy = [...state.posts]
      const newState = postsCopy.filter(post =>post.postId !== action.payload.postId)
      state.posts = newState
    }
  },
});

export const { savePosts, addPost, deletePost } = postsSlice.actions;

export default postsSlice.reducer

