import { createSlice } from '@reduxjs/toolkit';
import { pick } from 'lodash';

const allowedTypes = ['Online', 'Hybrid', 'In-Class'].map((type) => ({ key: type, label: type }));
const allowedDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((type) => ({ key: type, label: type }));
const initialState = {
  formData: {
    name: '',
    type: '',
    description: '',
    lectureNotes: [],
    videos: [],
    quizzes: [],
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
  allowedDays
};

export const slice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setFormData(state, action) {
      state.formData = pick(action.payload, ['name', 'type', 'description']);
    },
    addLectureNote(state, action) {
      state.content.lectureNotes.push(action.payload);
    },
    addVideo(state, action) {
      state.content.videos.push(action.payload);
    },
    addQuiz(state, action) {
      state.content.quizzes.push(action.payload);
    },
    clearContent(state) {
      state.content = {
        lectureNotes: [],
        videos: [],
        quizzes: [],
      };
    },
  },
});

export const { setFormData } = slice.actions;

export default slice.reducer;
