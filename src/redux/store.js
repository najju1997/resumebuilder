import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './slices/resumeSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    ui: uiReducer,
  },
});

export default store;
