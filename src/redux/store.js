import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './slices/resumeSlice';
import uiReducer from './slices/uiSlice';
import resumeListReducer from './slices/resumeListSlice';

export const store = configureStore({
  reducer: {
    resume: resumeReducer,
    ui: uiReducer,
    resumeList: resumeListReducer,
  },
});

export default store;
