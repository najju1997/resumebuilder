import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getResumeById, saveResume, updateResume } from '../../api/resumeapi'; // Ensure getResumeById exists

// Thunk to fetch a resume by ID
export const fetchResume = createAsyncThunk(
  'resume/fetchResume',
  async ({ resumeId, token }) => {
    const response = await getResumeById(resumeId, token); // Fetch the resume from the backend
    return response; // The fetched resume data
  }
);

const initialState = {
  resumeId: null, // Store the resumeId
  personalDetails: {
    firstName: '',
    lastName: '',
    profilePhoto: null,
  },
  contactInformation: {
    email: '',
    phone: '',
    country: '',
    city: '',
    address: '',
    postalCode: '',
  },
  professionalSummary: '',
  employmentHistory: [],
  skills: [],
  education: [],
  internships: [],
  courses: [],
  projects: [],
  references: [],
  websiteLinks: [],
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResumeId(state, action) {
      state.resumeId = action.payload; // Store the generated resumeId
    },
    setPersonalDetails(state, action) {
      state.personalDetails = action.payload;
      saveResumeToBackend(state);
    },
    setContactInformation(state, action) {
      state.contactInformation = action.payload;
      saveResumeToBackend(state);
    },
    addEmploymentHistory(state, action) {
      state.employmentHistory.push(action.payload);
      saveResumeToBackend(state);
    },
    updateEmploymentHistory(state, action) {
      const { index, ...updatedEmployment } = action.payload;
      state.employmentHistory[index] = updatedEmployment;
      saveResumeToBackend(state);
    },
    removeEmploymentHistory(state, action) {
      state.employmentHistory.splice(action.payload, 1);
      saveResumeToBackend(state);
    },
    addSkill(state, action) {
      state.skills.push(action.payload);
      saveResumeToBackend(state);
    },
    updateSkill(state, action) {
      const { index, ...updatedSkill } = action.payload;
      state.skills[index] = updatedSkill;
      saveResumeToBackend(state);
    },
    removeSkill(state, action) {
      state.skills.splice(action.payload, 1);
      saveResumeToBackend(state);
    },
    addEducation(state, action) {
      state.education.push(action.payload);
      saveResumeToBackend(state);
    },
    updateEducation(state, action) {
      const { index, ...updatedEducation } = action.payload;
      state.education[index] = updatedEducation;
      saveResumeToBackend(state);
    },
    removeEducation(state, action) {
      state.education.splice(action.payload, 1);
      saveResumeToBackend(state);
    },
    setProfessionalSummary(state, action) {
      state.professionalSummary = action.payload;
      saveResumeToBackend(state);
    },
    addInternship(state, action) {
      state.internships.push(action.payload);
      saveResumeToBackend(state);
    },
    updateInternship(state, action) {
      const { index, ...updatedInternship } = action.payload;
      state.internships[index] = updatedInternship;
      saveResumeToBackend(state);
    },
    removeInternship(state, action) {
      state.internships.splice(action.payload, 1);
      saveResumeToBackend(state);
    },
    addCourse(state, action) {
      state.courses.push(action.payload);
      saveResumeToBackend(state);
    },
    updateCourse(state, action) {
      const { index, ...updatedCourse } = action.payload;
      state.courses[index] = updatedCourse;
      saveResumeToBackend(state);
    },
    removeCourse(state, action) {
      state.courses.splice(action.payload, 1);
      saveResumeToBackend(state);
    },
    addProject(state, action) {
      state.projects.push(action.payload);
      saveResumeToBackend(state);
    },
    updateProject(state, action) {
      const { index, ...updatedProject } = action.payload;
      state.projects[index] = updatedProject;
      saveResumeToBackend(state);
    },
    removeProject(state, action) {
      state.projects.splice(action.payload, 1);
      saveResumeToBackend(state);
    },
    addReference(state, action) {
      state.references.push(action.payload);
      saveResumeToBackend(state);
    },
    updateReference(state, action) {
      const { index, ...updatedReference } = action.payload;
      state.references[index] = updatedReference;
      saveResumeToBackend(state);
    },
    removeReference(state, action) {
      state.references.splice(action.payload, 1);
      saveResumeToBackend(state);
    },
    addWebsiteLink(state, action) {
      state.websiteLinks.push(action.payload);
      saveResumeToBackend(state);
    },
    updateWebsiteLink(state, action) {
      const { index, ...updatedLink } = action.payload;
      state.websiteLinks[index] = updatedLink;
      saveResumeToBackend(state);
    },
    removeWebsiteLink(state, action) {
      state.websiteLinks.splice(action.payload, 1);
      saveResumeToBackend(state);
    },
    resetResume(state) {
      return initialState;
    },
    updateField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
      saveResumeToBackend(state); // Save the updated field to the backend
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResume.fulfilled, (state, action) => {
        // Update the state with the fetched resume data
        return { ...state, ...action.payload };
      });
  }
});

// Function to save or update the resume in the backend
const saveResumeToBackend = async (resumeData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    // Check if resumeId exists; if so, update the resume
    if (resumeData.resumeId) {
      await updateResume(resumeData.resumeId, resumeData, token);
    } else {
      // If no resumeId, create a new resume
      const newResume = await saveResume(resumeData, token);
      resumeData.resumeId = newResume._id; // Set the resumeId once created
    }
  } catch (error) {
    console.error('Error saving resume data:', error.message || error);
  }
};

export const {
  setResumeId, // Export the setResumeId action
  setPersonalDetails,
  setContactInformation,
  addEmploymentHistory,
  updateEmploymentHistory,
  removeEmploymentHistory,
  addSkill,
  updateSkill,
  removeSkill,
  addEducation,
  updateEducation,
  removeEducation,
  setProfessionalSummary,
  addInternship,
  updateInternship,
  removeInternship,
  addCourse,
  updateCourse,
  removeCourse,
  addProject,
  updateProject,
  removeProject,
  addReference,
  updateReference,
  removeReference,
  addWebsiteLink,
  updateWebsiteLink,
  removeWebsiteLink,
  resetResume,
  updateField, // Export updateField for handling generic form updates
} = resumeSlice.actions;

export default resumeSlice.reducer;
