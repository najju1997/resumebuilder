import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getResumes, deleteResume, renameResume, updateResume } from '../../api/resumeapi';

// Thunks for asynchronous operations
export const fetchResumes = createAsyncThunk('resumes/fetchResumes', async (token) => {
  const response = await getResumes(token);
  console.log('Fetched resumes:', response.data); // Log the fetched resumes
  return response.data;
});

export const removeResume = createAsyncThunk('resumes/removeResume', async ({ id, token }) => {
  await deleteResume(id, token);
  return id;
});

export const updateResumeName = createAsyncThunk(
  'resumes/updateResumeName',
  async ({ id, newName, token }) => {
    console.log('resumeListSlice resumeid:', id, newName); // Change 'name' to 'resumeName'
    const response = await renameResume(id, newName, token); // Pass resumeName to API
    return response.data;
  }
);


export const editResume = createAsyncThunk('resumes/editResume', async ({ id, resumeData, token }) => {
  const response = await updateResume(id, resumeData, token);
  return response.data;
});

const resumeListSlice = createSlice({
  name: 'resumeList',
  initialState: {
    resumes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchResumes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchResumes.fulfilled, (state, action) => {
        state.resumes = action.payload;
        state.loading = false;
      })
      .addCase(fetchResumes.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(removeResume.fulfilled, (state, action) => {
        state.resumes = state.resumes.filter((resume) => resume._id !== action.payload);
      })
      // Handle updating the resume name after it's renamed in the backend
      .addCase(updateResumeName.fulfilled, (state, action) => {
        const updatedResume = action.payload.resume; // The updated resume returned from the backend
        const index = state.resumes.findIndex((resume) => resume._id === updatedResume._id);
        if (index !== -1) {
          state.resumes[index].resumeName = updatedResume.resumeName; // Update the resumeName in Redux state
        }
      })
      .addCase(editResume.fulfilled, (state, action) => {
        const index = state.resumes.findIndex((resume) => resume._id === action.payload._id);
        if (index !== -1) {
          state.resumes[index] = action.payload;
        }
      });
  },
});

export default resumeListSlice.reducer;
