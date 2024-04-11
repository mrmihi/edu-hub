import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showLoader: false,
};

export const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    toggleLoader(state, action) {
      state.showLoader = action.payload;
    },
  },
});

export const { toggleLoader } = slice.actions;

export default slice.reducer;
