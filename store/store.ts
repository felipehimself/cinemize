import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import formSlice from '../features/formSlice';
import searchSlice from '../features/searchSlice';

const store = configureStore({
  reducer: {
    showForm: formSlice,
    showSearch : searchSlice
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;