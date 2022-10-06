import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import formSlice from '../features/formSlice';

const store = configureStore({
  reducer: {
    showForm: formSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;