import { createSlice } from '@reduxjs/toolkit';
import { saveResume, updateResume } from '../../api/resumeapi'; // Make sure to have an API to update a resume by ID

// Helper function to load resume data from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('resumeState');
    const parsedState = serializedState ? JSON.parse(serializedState) : undefined;

    // Check if resumeId exists in the parsed state
    if (parsedState && parsedState.resumeId) {
      return parsedState; // Return the state if resumeId is valid
    } else {
      console.warn('No valid resumeId found in saved state');
      return undefined; // Return undefined if resumeId is missing or invalid
    }
  } catch (err) {
    console.error('Could not load state', err);
    return undefined;
  }
};

// Helper function to save resume data to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('resumeState', serializedState);
  } catch (err) {
    console.error('Could not save state', err);
  }
};


const initialState = loadState() || {
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
      state.resumeId = action.payload; // Set resumeId when it's generated
    },
    setPersonalDetails(state, action) {
      state.personalDetails = action.payload;
      saveState(state);
      saveResumeToBackend(state);
    },
    setContactInformation(state, action) {
      state.contactInformation = action.payload;
      saveState(state);
      saveResumeToBackend(state);
    },
    addEmploymentHistory(state, action) {
      state.employmentHistory.push(action.payload);
      saveState(state);
      saveResumeToBackend(state);
    },
    updateEmploymentHistory(state, action) {
      const { index, ...updatedEmployment } = action.payload;
      state.employmentHistory[index] = updatedEmployment;
      saveState(state);
      saveResumeToBackend(state);
    },
    removeEmploymentHistory(state, action) {
      state.employmentHistory.splice(action.payload, 1);
      saveState(state);
      saveResumeToBackend(state);
    },
    addSkill(state, action) {
      state.skills.push(action.payload);
      saveState(state);
      saveResumeToBackend(state);
    },
    updateSkill(state, action) {
      const { index, ...updatedSkill } = action.payload;
      state.skills[index] = updatedSkill;
      saveState(state);
      saveResumeToBackend(state);
    },
    removeSkill(state, action) {
      state.skills.splice(action.payload, 1);
      saveState(state);
      saveResumeToBackend(state);
    },
    addEducation(state, action) {
      state.education.push(action.payload);
      saveState(state);
      saveResumeToBackend(state);
    },
    updateEducation(state, action) {
      const { index, ...updatedEducation } = action.payload;
      state.education[index] = updatedEducation;
      saveState(state);
      saveResumeToBackend(state);
    },
    removeEducation(state, action) {
      state.education.splice(action.payload, 1);
      saveState(state);
      saveResumeToBackend(state);
    },
    setProfessionalSummary(state, action) {
      state.professionalSummary = action.payload;
      saveState(state);
      saveResumeToBackend(state);
    },
    addInternship(state, action) {
      state.internships.push(action.payload);
      saveState(state);
      saveResumeToBackend(state);
    },
    updateInternship(state, action) {
      const { index, ...updatedInternship } = action.payload;
      state.internships[index] = updatedInternship;
      saveState(state);
      saveResumeToBackend(state);
    },
    removeInternship(state, action) {
      state.internships.splice(action.payload, 1);
      saveState(state);
      saveResumeToBackend(state);
    },
    addCourse(state, action) {
      state.courses.push(action.payload);
      saveState(state);
      saveResumeToBackend(state);
    },
    updateCourse(state, action) {
      const { index, ...updatedCourse } = action.payload;
      state.courses[index] = updatedCourse;
      saveState(state);
      saveResumeToBackend(state);
    },
    removeCourse(state, action) {
      state.courses.splice(action.payload, 1);
      saveState(state);
      saveResumeToBackend(state);
    },
    addProject(state, action) {
      state.projects.push(action.payload);
      saveState(state);
      saveResumeToBackend(state);
    },
    updateProject(state, action) {
      const { index, ...updatedProject } = action.payload;
      state.projects[index] = updatedProject;
      saveState(state);
      saveResumeToBackend(state);
    },
    removeProject(state, action) {
      state.projects.splice(action.payload, 1);
      saveState(state);
      saveResumeToBackend(state);
    },
    addReference(state, action) {
      state.references.push(action.payload);
      saveState(state);
      saveResumeToBackend(state);
    },
    updateReference(state, action) {
      const { index, ...updatedReference } = action.payload;
      state.references[index] = updatedReference;
      saveState(state);
      saveResumeToBackend(state);
    },
    removeReference(state, action) {
      state.references.splice(action.payload, 1);
      saveState(state);
      saveResumeToBackend(state);
    },
    addWebsiteLink(state, action) {
      state.websiteLinks.push(action.payload);
      saveState(state);
      saveResumeToBackend(state);
    },
    updateWebsiteLink(state, action) {
      const { index, ...updatedLink } = action.payload;
      state.websiteLinks[index] = updatedLink;
      saveState(state);
      saveResumeToBackend(state);
    },
    removeWebsiteLink(state, action) {
      state.websiteLinks.splice(action.payload, 1);
      saveState(state);
      saveResumeToBackend(state);
    },
    resetResume(state) {
      return initialState;
    },
  },
});

// Function to save or update the resume in the backend
const saveResumeToBackend = async (resumeData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    console.log('resumeSlice passes the data ',resumeData.resumeId)
    // Check if resumeId exists; if so, update the resume
    if (resumeData.resumeId) {
      await updateResume(resumeData.resumeId, resumeData, token);
    } else {
      // If no resumeId, create a new resume
      await saveResume(resumeData, token);
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
  resetResume
} = resumeSlice.actions;

export default resumeSlice.reducer;
