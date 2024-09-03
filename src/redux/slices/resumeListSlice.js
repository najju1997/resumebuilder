import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getResumes, deleteResume, renameResume } from '../../api/resumeapi';

// Thunks for asynchronous operations
export const fetchResumes = createAsyncThunk('resumes/fetchResumes', async (token) => {
  const response = await getResumes(token);
  return response.data;
});

export const removeResume = createAsyncThunk('resumes/removeResume', async ({ id, token }) => {
  await deleteResume(id, token);
  return id;
});

export const updateResumeName = createAsyncThunk('resumes/updateResumeName', async ({ id, name, token }) => {
  const response = await renameResume(id, name, token);
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
      .addCase(updateResumeName.fulfilled, (state, action) => {
        const index = state.resumes.findIndex((resume) => resume._id === action.payload._id);
        if (index !== -1) {
          state.resumes[index].name = action.payload.name;
        }
      });
  },
});

export default resumeListSlice.reducer;
