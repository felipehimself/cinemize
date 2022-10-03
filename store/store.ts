import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import postsSlice from '../features/postsSlice';
import formSlice from '../features/formSlice';

const store = configureStore({
  reducer: {
    posts: postsSlice,
    showForm: formSlice
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch; // Export a hook

export default store;