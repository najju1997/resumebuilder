import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getResumeById, saveResume, updateResume } from '../../api/resumeapi'; // Ensure getResumeById exists
import debounce from 'lodash/debounce'; // Using lodash debounce

// Thunk to fetch a resume by ID
export const fetchResume = createAsyncThunk(
  'resume/fetchResume',
  async ({ resumeId, token }) => {
    const response = await getResumeById(resumeId, token); // Fetch the resume from the backend
    return response; // The fetched resume data
  }
);

const initialState = {
  resumeId: null,
  resumeName: '', // Store the resumeId
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

// Helper function to convert state into a plain object
const convertStateToObject = (state) => {
  return {
    resumeId: state.resumeId,
    resumeName: state.resumeName,
    personalDetails: { ...state.personalDetails },
    contactInformation: { ...state.contactInformation },
    professionalSummary: state.professionalSummary,
    employmentHistory: [...state.employmentHistory],
    skills: [...state.skills],
    education: [...state.education],
    internships: [...state.internships],
    courses: [...state.courses],
    projects: [...state.projects],
    references: [...state.references],
    websiteLinks: [...state.websiteLinks],
  };
};

// Debounced save function (500ms delay)
const debouncedSave = debounce(async (resumeData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    if (resumeData.resumeId) {
      await updateResume(resumeData.resumeId, resumeData, token);
    } else {
      const newResume = await saveResume(resumeData, token);
      resumeData.resumeId = newResume._id; // Set the resumeId once created
    }
    console.log('Resume saved to backend');
  } catch (error) {
    console.error('Error saving resume data:', error.message || error);
  }
}, 2000); // Save after a 500ms pause from the last change

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResumeId(state, action) {
      state.resumeId = action.payload; // Store the generated resumeId
    },
    setPersonalDetails(state, action) {
      state.personalDetails = action.payload;

      // Set resumeName as firstName initially if resumeName has not been changed manually
      if (!state.resumeName || state.resumeName === state.personalDetails.firstName) {
        state.resumeName = action.payload.firstName || 'Untitled Resume';
      }

      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    setResumeName(state, action) {
      state.resumeName = action.payload; // This allows the user to rename the resume
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    setContactInformation(state, action) {
      state.contactInformation = action.payload;
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    addEmploymentHistory(state, action) {
      state.employmentHistory.push(action.payload);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    updateEmploymentHistory(state, action) {
      const { index, ...updatedEmployment } = action.payload;
      state.employmentHistory[index] = updatedEmployment;
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    removeEmploymentHistory(state, action) {
      state.employmentHistory.splice(action.payload, 1);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    addSkill(state, action) {
      state.skills.push(action.payload);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    updateSkill(state, action) {
      const { index, ...updatedSkill } = action.payload;
      state.skills[index] = updatedSkill;
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    removeSkill(state, action) {
      state.skills.splice(action.payload, 1);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    addEducation(state, action) {
      state.education.push(action.payload);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    updateEducation(state, action) {
      const { index, ...updatedEducation } = action.payload;
      state.education[index] = updatedEducation;
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    removeEducation(state, action) {
      state.education.splice(action.payload, 1);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    setProfessionalSummary(state, action) {
      state.professionalSummary = action.payload;
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    addInternship(state, action) {
      state.internships.push(action.payload);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    updateInternship(state, action) {
      const { index, ...updatedInternship } = action.payload;
      state.internships[index] = updatedInternship;
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    removeInternship(state, action) {
      state.internships.splice(action.payload, 1);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    addCourse(state, action) {
      state.courses.push(action.payload);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    updateCourse(state, action) {
      const { index, ...updatedCourse } = action.payload;
      state.courses[index] = updatedCourse;
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    removeCourse(state, action) {
      state.courses.splice(action.payload, 1);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    addProject(state, action) {
      state.projects.push(action.payload);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    updateProject(state, action) {
      const { index, ...updatedProject } = action.payload;
      state.projects[index] = updatedProject;
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    removeProject(state, action) {
      state.projects.splice(action.payload, 1);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    addReference(state, action) {
      state.references.push(action.payload);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    updateReference(state, action) {
      const { index, ...updatedReference } = action.payload;
      state.references[index] = updatedReference;
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    removeReference(state, action) {
      state.references.splice(action.payload, 1);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    addWebsiteLink(state, action) {
      state.websiteLinks.push(action.payload);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    updateWebsiteLink(state, action) {
      const { index, ...updatedLink } = action.payload;
      state.websiteLinks[index] = updatedLink;
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    removeWebsiteLink(state, action) {
      state.websiteLinks.splice(action.payload, 1);
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Pass the plain object to debouncedSave
    },
    resetResume(state) {
      return initialState;
    },
    updateField(state, action) {
      const { field, value } = action.payload;
      state[field] = value;
      const plainState = convertStateToObject(state); // Convert state to a plain object
      debouncedSave(plainState); // Save the updated field to the backend
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

export const {
  setResumeId,
  setPersonalDetails,
  setResumeName,
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
