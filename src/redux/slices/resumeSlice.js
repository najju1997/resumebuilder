import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getResumeById, saveResume, updateResume } from '../../api/resumeapi';
import debounce from 'lodash/debounce';

// Thunk to fetch a resume by ID
export const fetchResume = createAsyncThunk(
  'resume/fetchResume',
  async ({ resumeId, token }, { rejectWithValue }) => {
    try {
      const response = await getResumeById(resumeId, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch resume');
    }
  }
);

// Initial additional sections
const allAdditionalSections = [
  { id: 'courses', name: 'Courses' },
  { id: 'internships', name: 'Internships' },
  { id: 'languages', name: 'Languages' },
  { id: 'projects', name: 'Projects' },
  { id: 'references', name: 'References' },
  { id: 'website-links', name: 'Website Links' },
  { id: 'hobbies', name: 'Hobbies' },
];

const initialState = {
  resumeId: null,
  resumeName: '',
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
  languages: [],
  references: [],
  websiteLinks: [],
  hobbies: [],
  activeSections: [],
  availableAdditionalSections: allAdditionalSections,
};

const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// Helper function to convert state into a plain object
const convertStateToObject = (state) => {
  return deepClone({
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
    languages: [...state.languages],
    references: [...state.references],
    websiteLinks: [...state.websiteLinks],
    hobbies: [...state.hobbies],
    activeSections: [...state.activeSections],
    availableAdditionalSections: [...state.availableAdditionalSections],
  });
};

// Debounced save function (2000ms delay)
const debouncedSave = debounce(async (resumeData) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    if (resumeData.resumeId) {
      await updateResume(resumeData.resumeId, resumeData, token);
    } else {
      const newResume = await saveResume(resumeData, token);
      resumeData.resumeId = newResume._id;
    }
    console.log('Resume saved to backend');
  } catch (error) {
    console.error('Error saving resume data:', error.message || error);
  }
}, 2000);

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setResumeId(state, action) {
      state.resumeId = action.payload;
    },
    setPersonalDetails(state, action) {
      state.personalDetails = action.payload;

      // Set resumeName as firstName initially if resumeName has not been changed manually
      if (!state.resumeName || state.resumeName === state.personalDetails.firstName) {
        state.resumeName = action.payload.firstName || 'Untitled Resume';
      }

      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    setResumeName(state, action) {
      state.resumeName = action.payload;
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    setContactInformation(state, action) {
      state.contactInformation = action.payload;
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    addEmploymentHistory(state, action) {
      state.employmentHistory.push(action.payload);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    updateEmploymentHistory(state, action) {
      const { index, ...updatedEmployment } = action.payload;
      state.employmentHistory[index] = updatedEmployment;
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    removeEmploymentHistory(state, action) {
      state.employmentHistory.splice(action.payload, 1);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    addSkill(state, action) {
      state.skills.push(action.payload);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    updateSkill(state, action) {
      const { index, ...updatedSkill } = action.payload;
      state.skills[index] = updatedSkill;
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    removeSkill(state, action) {
      state.skills.splice(action.payload, 1);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    addEducation(state, action) {
      state.education.push(action.payload);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    updateEducation(state, action) {
      const { index, ...updatedEducation } = action.payload;
      state.education[index] = updatedEducation;
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    removeEducation(state, action) {
      state.education.splice(action.payload, 1);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    setProfessionalSummary(state, action) {
      state.professionalSummary = action.payload;
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    addInternship(state, action) {
      state.internships.push(action.payload);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    updateInternship(state, action) {
      const { index, ...updatedInternship } = action.payload;
      state.internships[index] = updatedInternship;
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    removeInternship(state, action) {
      state.internships.splice(action.payload, 1);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    addCourse(state, action) {
      state.courses.push(action.payload);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    updateCourse(state, action) {
      const { index, ...updatedCourse } = action.payload;
      state.courses[index] = updatedCourse;
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    removeCourse(state, action) {
      state.courses.splice(action.payload, 1);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    addProject(state, action) {
      state.projects.push(action.payload);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    updateProject(state, action) {
      const { index, ...updatedProject } = action.payload;
      state.projects[index] = updatedProject;
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    removeProject(state, action) {
      state.projects.splice(action.payload, 1);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    addLanguage(state, action) {
      state.languages.push(action.payload);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    updateLanguage(state, action) {
      const { index, language, proficiency } = action.payload;
      state.languages[index] = { language, proficiency };
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    removeLanguage(state, action) {
      state.languages.splice(action.payload, 1);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    addReference(state, action) {
      state.references.push(action.payload);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    updateReference(state, action) {
      const { index, ...updatedReference } = action.payload;
      state.references[index] = updatedReference;
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    removeReference(state, action) {
      state.references.splice(action.payload, 1);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    addWebsiteLink(state, action) {
      state.websiteLinks.push(action.payload);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    updateWebsiteLink(state, action) {
      const { index, ...updatedLink } = action.payload;
      state.websiteLinks[index] = updatedLink;
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    removeWebsiteLink(state, action) {
      state.websiteLinks.splice(action.payload, 1);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    addHobby(state, action) {
      state.hobbies.push(action.payload); // Expecting an object like { hobby: 'Reading' }
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    updateHobby(state, action) {
      const { index, hobby } = action.payload;
      state.hobbies[index] = { hobby }; // Update hobby object
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    removeHobby(state, action) {
      state.hobbies.splice(action.payload, 1);
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    resetResume() {
      return initialState;
    },
    updateField(state, action) {
      const { field, value } = action.payload;
      if (typeof state[field] === 'object' && !Array.isArray(state[field]) && state[field] !== null) {
        state[field] = { ...state[field], ...value };
      } else {
        state[field] = value;
      }
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    // Added reducers for managing active and available additional sections
    addActiveSection(state, action) {
      const section = action.payload;
      state.activeSections.push(section);
      state.availableAdditionalSections = state.availableAdditionalSections.filter(
        (s) => s.id !== section.id
      );
      const plainState = convertStateToObject(state);
      debouncedSave(plainState);
    },
    removeActiveSection(state, action) {
      const sectionId = action.payload;
      const removedSection = state.activeSections.find((s) => s.id === sectionId);
      if (removedSection) {
        state.activeSections = state.activeSections.filter((s) => s.id !== sectionId);
    
        // Avoid duplicates in availableAdditionalSections
        const isAlreadyAvailable = state.availableAdditionalSections.some((s) => s.id === sectionId);
        if (!isAlreadyAvailable) {
          state.availableAdditionalSections.push(removedSection);
        }
    
        // Clear the associated data for the removed section
        state[sectionId] = initialState[sectionId];
    
        const plainState = convertStateToObject(state);
        debouncedSave(plainState);
      }
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResume.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      })
      .addCase(fetchResume.rejected, (state, action) => {
        state.error = action.payload || 'Failed to fetch resume';
      });
  },
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
  addLanguage, updateLanguage, removeLanguage,
  addReference,
  updateReference,
  removeReference,
  addWebsiteLink,
  updateWebsiteLink,
  removeWebsiteLink,
  addHobby, updateHobby, removeHobby,
  resetResume,
  updateField,
  addActiveSection, // Exported new action
  removeActiveSection, // Exported new action
} = resumeSlice.actions;

export default resumeSlice.reducer;
