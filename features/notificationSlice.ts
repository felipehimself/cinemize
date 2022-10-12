import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notificationSlice',
  initialState: { showNotification: false, hasNotification: false },
  reducers: {
    toggleNotification: (state, action) => {
      state.showNotification = action.payload;
    },
    
  },
});

export const { toggleNotification } = notificationSlice.actions;

export default notificationSlice.reducer

