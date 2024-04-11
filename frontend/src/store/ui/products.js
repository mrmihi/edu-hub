import { createSlice } from '@reduxjs/toolkit';
import { pick } from 'lodash';

const allowedTypes = ['Supplements and Herbs', 'Sports and Nutrition', 'Medicine', 'Beauty', 'Bath'].map((type) => ({ key: type, label: type }));

const initialState = {
  formData: {
    name: '',
    type: '',
    measurement_unit: '',
    age_limit: 2,
    markup_price: 0,
    exp_date: '',
    manufactured_date: '',
    description: '',
    stock: 5,
    image: '',
  },
  filters: [
    { key: 'name', label: 'Name' },
    {
      key: 'type',
      label: 'Type',
      options: allowedTypes,
    },
    { key: 'measurement_unit', label: 'Unit' },
    { key: 'description', label: 'Description' },
    { key: 'age_limit', label: 'Age Limit' },
  ],
  sorts: [
    {
      key: 'selling_price',
      label: 'Sort by price',
      direction: 0,
    },
    {
      key: 'stock',
      label: 'Sort by availability',
      direction: 0,
    },
  ],
  allowedTypes,
};

export const slice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = pick(action.payload, ['name', 'type', 'description', 'stock', 'measurement_unit', 'age_limit', 'markup_price', 'exp_date', 'manufactured_date', 'image']);
    },
  },
});

export const { setFormData } = slice.actions;

export default slice.reducer;
