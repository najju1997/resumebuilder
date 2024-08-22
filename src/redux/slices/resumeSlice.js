import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
  employmentHistory: [],
  skills: [],
  education: [],
  additionalSections: {
    internships: [],
    courses: [],
    references: [],
    projects: [],
    websiteLinks: [],
  },
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setPersonalDetails: (state, action) => {
      state.personalDetails = action.payload;
    },
    setContactInformation: (state, action) => {
      state.contactInformation = action.payload;
    },
    addEmploymentHistory: (state, action) => {
      state.employmentHistory.push(action.payload);
    },
    removeEmploymentHistory: (state, action) => {
      state.employmentHistory.splice(action.payload, 1);
    },
    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    removeSkill: (state, action) => {
      state.skills.splice(action.payload, 1);
    },
    addEducation: (state, action) => {
      state.education.push(action.payload);
    },
    removeEducation: (state, action) => {
      state.education.splice(action.payload, 1);
    },
    addInternship: (state, action) => {
      state.additionalSections.internships.push(action.payload);
    },
    removeInternship: (state, action) => {
      state.additionalSections.internships.splice(action.payload, 1);
    },
    addCourse: (state, action) => {
      state.additionalSections.courses.push(action.payload);
    },
    removeCourse: (state, action) => {
      state.additionalSections.courses.splice(action.payload, 1);
    },
    addReference: (state, action) => {
      state.additionalSections.references.push(action.payload);
    },
    removeReference: (state, action) => {
      state.additionalSections.references.splice(action.payload, 1);
    },
    addProject: (state, action) => {
      state.additionalSections.projects.push(action.payload);
    },
    removeProject: (state, action) => {
      state.additionalSections.projects.splice(action.payload, 1);
    },
    addWebsiteLink: (state, action) => {
      state.additionalSections.websiteLinks.push(action.payload);
    },
    removeWebsiteLink: (state, action) => {
      state.additionalSections.websiteLinks.splice(action.payload, 1);
    },
  },
});

export const {
  setPersonalDetails,
  setContactInformation,
  addEmploymentHistory,
  removeEmploymentHistory,
  addSkill,
  removeSkill,
  addEducation,
  removeEducation,
  addInternship,
  removeInternship,
  addCourse,
  removeCourse,
  addReference,
  removeReference,
  addProject,
  removeProject,
  addWebsiteLink,
  removeWebsiteLink,
} = resumeSlice.actions;

export default resumeSlice.reducer;
