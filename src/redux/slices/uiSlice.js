import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: true,
  isModalOpen: false,
  progress: 0, // Progress percentage for the resume completion
  user: null, // Store user data here
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // Persist user data
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    resetState: () => initialState,
  },
});

export const { toggleSidebar, openModal, closeModal, setProgress, setUser, logoutUser,resetState } = uiSlice.actions;

export default uiSlice.reducer;
