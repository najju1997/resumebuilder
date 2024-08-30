import { createSlice } from '@reduxjs/toolkit';
import { saveResume } from '../../api/resumeapi';

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
  professionalSummary: "",
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
  },
});

const saveResumeToBackend = async (resumeData) => {
  try {
    const token = JSON.parse(localStorage.getItem('user')).token;
    await saveResume(resumeData, token);
  } catch (error) {
    console.error('Error saving resume data:', error);
  }
};

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
} = resumeSlice.actions;

export default resumeSlice.reducer;
