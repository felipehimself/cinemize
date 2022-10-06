import { createSlice } from '@reduxjs/toolkit';


const searchSlice = createSlice({
  name: 'searchSlice',
  initialState: { showSearch: false },
  reducers: {
    toggleSearch: (state, action) => {
      state.showSearch = action.payload;
    },
    
  },
});

export const { toggleSearch } = searchSlice.actions;

export default searchSlice.reducer

