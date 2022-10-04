import { createSlice,  } from '@reduxjs/toolkit';
import { PostCard } from '../ts/types/post';

const initial: PostCard[] = [];

const profilePosts = createSlice({
  name: 'profilePosts',
  
  initialState: { profilePosts: initial },

  reducers: {
    saveProfilePosts: (state, action) => {
      state.profilePosts = action.payload;
    },
    addProfilePost: (state, action) => {
      state.profilePosts.push(action.payload)
    },  
    deleteProfilePost: (state,action) => {
      const postsCopy = [...state.profilePosts]
      const newState = postsCopy.filter(post =>post.postId !== action.payload.postId)
      state.profilePosts = newState
    }
  },
});

export const { saveProfilePosts, addProfilePost, deleteProfilePost } = profilePosts.actions;

export default profilePosts.reducer

