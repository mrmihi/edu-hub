import { createSlice } from '@reduxjs/toolkit';
import { pick } from 'lodash';

const allowedTypes = ['Online', 'Hybrid', 'In-Class'].map((type) => ({ key: type, label: type }));

const initialState = {
  formData: {
    name: '',
    type: '',
    description: '',
  },
  filters: [
    { key: 'name', label: 'Name' },
    {
      key: 'type',
      label: 'Type',
      options: allowedTypes,
    },
    { key: 'description', label: 'Description' },
  ],
  sorts: [
    {
      key: 'price',
      label: 'Sort by price',
      direction: 0,
    },
  ],
  allowedTypes,
};

export const slice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = pick(action.payload, ['name', 'type', 'description']);
    },
  },
});

export const { setFormData } = slice.actions;

export default slice.reducer;
