import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: [
    {
      key: 'status',
      label: 'Status',
      options: [
        {
          key: 'open',
          label: 'Open',
        },
        {
          key: 'resolved',
          label: 'Resolved',
        },
      ],
    },
  ],
  sorts: [
    {
      key: 'created_at',
      label: 'Sort by creation date',
      direction: 0,
    },
  ],
};

export const slice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
});

export default slice.reducer;
