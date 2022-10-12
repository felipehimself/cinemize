import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'formSlice',
  initialState: { showForm: false },
  reducers: {
    toggleForm: (state, action) => {
      state.showForm = action.payload;
    },
    
  },
});

export const { toggleForm } = formSlice.actions;

export default formSlice.reducer

