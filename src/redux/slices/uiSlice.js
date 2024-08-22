import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: true,
  isModalOpen: false,
  progress: 0, // Progress percentage for the resume completion
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const { toggleSidebar, openModal, closeModal, setProgress } = uiSlice.actions;

export default uiSlice.reducer;
