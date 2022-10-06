import { createSlice } from '@reduxjs/toolkit';
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
      state.posts.push(action.payload);
    },
    likePost: (state, action) => {
      const postsCopy = [...state.posts];
      const newState = postsCopy.map((post) => {
        if (post.postId === action.payload.postId) {
          return {
            ...post,
            likedBy: [...post.likedBy, action.payload.newLike],
          };
        }
        return post;
      });

      state.posts = newState;
    },
    dislikePost: (state, action) => {
      const postsCopy = [...state.posts];
      const newState = postsCopy.map((post) => {
        if (post.postId === action.payload.postId) {
          return {
            ...post,
            likedBy: post.likedBy.filter(
              (like) => like.userId !== action.payload.userId
            ),
          };
        }

        return post;
      });

      state.posts = newState;
    },
    favoritePost: (state, action) => {
      const postsCopy = [...state.posts];
      const newState = postsCopy.map((post) => {
        if (post.postId === action.payload.postId) {
          return {
            ...post,
            favoritedBy: [...post.favoritedBy, action.payload.newFavorite],
          };
        }
        return post;
      });

      state.posts = newState;
    },
    unfavoritePost: (state, action) => {
      const postsCopy = [...state.posts];
      const newState = postsCopy.map((post) => {
        if (post.postId === action.payload.postId) {
          return {
            ...post,
            favoritedBy: post.favoritedBy.filter(
              (like) => like.userId !== action.payload.userId
            ),
          };
        }

        return post;
      });

      state.posts = newState;
    },
    deletePost: (state, action) => {
      const postsCopy = [...state.posts];
      const newState = postsCopy.filter(
        (post) => post.postId !== action.payload.postId
      );
      state.posts = newState;
    },
  },
});

export const {
  savePosts,
  addPost,
  likePost,
  dislikePost,
  deletePost,
  favoritePost,
  unfavoritePost,
} = postsSlice.actions;

export default postsSlice.reducer;
