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
    projects: [],
    references: [],
    websiteLinks: [],
  },
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setPersonalDetails(state, action) {
      state.personalDetails = action.payload;
    },
    setContactInformation(state, action) {
      state.contactInformation = action.payload;
    },
    addEmploymentHistory(state, action) {
      state.employmentHistory.push(action.payload);
    },
    updateEmploymentHistory(state, action) {
      const { index, ...updatedEmployment } = action.payload;
      state.employmentHistory[index] = updatedEmployment;
    },
    removeEmploymentHistory(state, action) {
      state.employmentHistory.splice(action.payload, 1);
    },
    addSkill(state, action) {
      state.skills.push(action.payload);
    },
    updateSkill(state, action) {
      const { index, ...updatedSkill } = action.payload;
      state.skills[index] = updatedSkill;
    },
    removeSkill(state, action) {
      state.skills.splice(action.payload, 1);
    },
    addEducation(state, action) {
      state.education.push(action.payload);
    },
    updateEducation(state, action) {
      const { index, ...updatedEducation } = action.payload;
      state.education[index] = updatedEducation;
    },
    removeEducation(state, action) {
      state.education.splice(action.payload, 1);
    },
    addInternship(state, action) {
      state.additionalSections.internships.push(action.payload);
    },
    updateInternship(state, action) {
      const { index, ...updatedInternship } = action.payload;
      state.additionalSections.internships[index] = updatedInternship;
    },
    removeInternship(state, action) {
      state.additionalSections.internships.splice(action.payload, 1);
    },
    addCourse(state, action) {
      state.additionalSections.courses.push(action.payload);
    },
    updateCourse(state, action) {
      const { index, ...updatedCourse } = action.payload;
      state.additionalSections.courses[index] = updatedCourse;
    },
    removeCourse(state, action) {
      state.additionalSections.courses.splice(action.payload, 1);
    },
    addProject(state, action) {
      state.additionalSections.projects.push(action.payload);
    },
    updateProject(state, action) {
      const { index, ...updatedProject } = action.payload;
      state.additionalSections.projects[index] = updatedProject;
    },
    removeProject(state, action) {
      state.additionalSections.projects.splice(action.payload, 1);
    },
    addReference(state, action) {
      state.additionalSections.references.push(action.payload);
    },
    updateReference(state, action) {
      const { index, ...updatedReference } = action.payload;
      state.additionalSections.references[index] = updatedReference;
    },
    removeReference(state, action) {
      state.additionalSections.references.splice(action.payload, 1);
    },
    addWebsiteLink(state, action) {
      state.additionalSections.websiteLinks.push(action.payload);
    },
    updateWebsiteLink(state, action) {
      const { index, ...updatedLink } = action.payload;
      state.additionalSections.websiteLinks[index] = updatedLink;
    },
    removeWebsiteLink(state, action) {
      state.additionalSections.websiteLinks.splice(action.payload, 1);
    },
  },
});

export const {
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
} = resumeSlice.actions;

export default resumeSlice.reducer;
