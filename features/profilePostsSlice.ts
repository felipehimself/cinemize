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
    likeProfilePost: (state, action)=>{
      const postsCopy= [...state.profilePosts]
      const newState = postsCopy.map(post => {
        if (post.postId === action.payload.postId){
          return {...post, likedBy: [...post.likedBy, action.payload.newLike]}
        }
        return post
      }) 

      state.profilePosts = newState
    },
    dislikeProfilePost: (state,action)=> {
        const postsCopy = [...state.profilePosts]
        const newState = postsCopy.map((post)=>{

          if(post.postId === action.payload.postId){

            return {...post, likedBy: post.likedBy.filter(like => like.userId !== action.payload.userId)}
          }

          return post
        })

        state.profilePosts = newState

    },

    favoriteProfilePost: (state, action)=>{
      const postsCopy= [...state.profilePosts]
      const newState = postsCopy.map(post => {
        if (post.postId === action.payload.postId){
          return {...post, favoritedBy: [...post.favoritedBy, action.payload.newFavorite]}
        }
        return post
      }) 

      state.profilePosts = newState
    },
    unfavoriteProfilePost: (state,action)=> {
        const postsCopy = [...state.profilePosts]
        const newState = postsCopy.map((post)=>{

          if(post.postId === action.payload.postId){

            return {...post, favoritedBy: post.favoritedBy.filter(like => like.userId !== action.payload.userId)}
          }

          return post
        })

        state.profilePosts = newState

    },
    deleteProfilePost: (state,action) => {
      const postsCopy = [...state.profilePosts]
      const newState = postsCopy.filter(post => post.postId !== action.payload.postId)
      state.profilePosts = newState
    }
  },
});

export const { saveProfilePosts, addProfilePost,likeProfilePost, deleteProfilePost, dislikeProfilePost, favoriteProfilePost,
  unfavoriteProfilePost } = profilePosts.actions;

export default profilePosts.reducer

