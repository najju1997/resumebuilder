// models/Resume.js
const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  personalDetails: {
    firstName: String,
    lastName: String,
    profilePhoto: String,
  },
  contactInformation: {
    email: String,
    phone: String,
    country: String,
    city: String,
    address: String,
    postalCode: String,
  },
  professionalSummary: String,
  employmentHistory: [
    {
      jobTitle: String,
      company: String,
      startDate: String,
      endDate: String,
      location: String,
      experiencePoints: String,
      currentlyWorking: Boolean,
    },
  ],
  skills: [
    {
      skill: String,
      level: Number, // e.g., 1-5
    },
  ],
  education: [
    {
      institute: String,
      degree: String,
      startDate: String,
      endDate: String,
      location: String,
      currentlyStudying: Boolean,
    },
  ],
  internships: [
    {
      jobTitle: String,
      company: String,
      startDate: String,
      endDate: String,
      location: String,
      currentlyWorking: Boolean,
    },
  ],
  courses: [
    {
      courseName: String,
      institution: String,
      startDate: String,
      endDate: String,
      currentlyEnrolled: Boolean,
    },
  ],
  projects: [
    {
      projectName: String,
      projectDescription: String,
      startDate: String,
      endDate: String,
      currentlyWorking: Boolean,
    },
  ],
  references: [
    {
      referentName: String,
      referentCompany: String,
      referentEmail: String,
      referentPhone: String,
    },
  ],
  websiteLinks: [
    {
      linkTitle: String,
      url: String,
    },
  ],
});

module.exports = mongoose.model('Resume', ResumeSchema);
