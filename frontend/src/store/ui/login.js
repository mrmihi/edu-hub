import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: {
    email: '',
    password: '',
  },
  rememberMe: false,
};

export const slice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = action.payload;
    },
    toggleRememberMe(state) {
      state.rememberMe = !state.rememberMe;
    },
  },
});

export const { setFormData, toggleRememberMe } = slice.actions;

export default slice.reducer;
