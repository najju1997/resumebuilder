import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resumeName: { type: String, default: '' },
  personalDetails: {
    firstName: { type: String, default: '' }, // Always save an empty string if not provided
    lastName: { type: String, default: '' },
    profilePhoto: { type: String, default: '' },
  },
  contactInformation: {
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    country: { type: String, default: '' },
    city: { type: String, default: '' },
    address: { type: String, default: '' },
    postalCode: { type: String, default: '' },
  },
  professionalSummary: { type: String, default: '' },
  employmentHistory: [
    {
      jobTitle: String,
      company: String,
      jobField: String,
      startDate: String,
      endDate: String,
      location: String,
      experiencePoints: [String],
      aiexperiencePoints: [String],
      currentlyWorking: Boolean,
    },
  ],
  skills: [
    {
      skill: String,
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
  languages: [
    {
      language: String,
      proficiency: String,
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
  hobbies: [
    {
      hobby: String,
    },
  ],
  activeSections: [],
});

export default mongoose.model('Resume', ResumeSchema);
