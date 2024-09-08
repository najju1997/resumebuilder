import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResume, updateField } from '../redux/slices/resumeSlice'; // Import the fetchResume and updateField actions
import PersonalDetailsForm from '../components/forms/PersonalDetailsForm';
import ContactInformationForm from '../components/forms/ContactInformationForm';
import EmploymentHistoryForm from '../components/forms/EmploymentHistoryForm';
import SkillsForm from '../components/forms/SkillsForm';
import EducationForm from '../components/forms/EducationForm';
import ProfessionalSummaryForm from '../components/forms/ProfessionalSummaryForm';
import InternshipForm from '../components/forms/additionalSections/InternshipForm';
import CoursesForm from '../components/forms/additionalSections/CoursesForm';
import ProjectsForm from '../components/forms/additionalSections/ProjectsForm';
import ReferencesForm from '../components/forms/additionalSections/ReferencesForm';
import WebsiteLinksForm from '../components/forms/additionalSections/WebsiteLinksForm';
import AdditionalSectionSelection from '../components/forms/AdditionalSectionSelection';
import ResumePreview from '../components/ResumePreview';
import Sidebar from '../components/common/Sidebar';

const sections = [
  'personal-details',
  'contact-information',
  'employment-history',
  'skills',
  'education',
  'professional-summary'
];

const allAdditionalSections = [
  { id: 'courses', name: 'Courses' },
  { id: 'internships', name: 'Internships' },
  { id: 'projects', name: 'Projects' },
  { id: 'references', name: 'References' },
  { id: 'website-links', name: 'Website Links' },
];

const ResumeBuilder = () => {
  const { resumeId } = useParams(); // Get resumeId from URL parameters
  const dispatch = useDispatch(); // Use dispatch to call actions
  const navigate = useNavigate(); // For navigation
  const token = localStorage.getItem('token'); // Get token from localStorage

  // Access resume data and status from Redux store
  const resumeData = useSelector((state) => state.resume);

  const [selectedSection, setSelectedSection] = useState('personal-details');
  const [activeSections, setActiveSections] = useState([]);
  const [availableAdditionalSections, setAvailableAdditionalSections] = useState(allAdditionalSections);

  useEffect(() => {
    if (resumeId) {
      // Fetch the resume from the backend
      dispatch(fetchResume({ resumeId, token }));
    } else {
      // If no resumeId, redirect or handle accordingly
    }
  }, [resumeId, token, dispatch]);

  // Handler for updating form inputs
  const handleInputChange = (field, value) => {
    dispatch(updateField({ field, value })); // Update Redux state and backend
  };

  const handleNext = () => {
    const currentIndex = [...sections, ...activeSections.map(s => s.id)].indexOf(selectedSection);
    if (currentIndex < [...sections, ...activeSections.map(s => s.id)].length - 1) {
      setSelectedSection([...sections, ...activeSections.map(s => s.id)][currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const currentIndex = [...sections, ...activeSections.map(s => s.id)].indexOf(selectedSection);
    if (currentIndex > 0) {
      setSelectedSection([...sections, ...activeSections.map(s => s.id)][currentIndex - 1]);
    }
  };

  const handleAddSection = (newSectionId) => {
    const sectionToAdd = availableAdditionalSections.find(section => section.id === newSectionId);
    if (sectionToAdd) {
      setActiveSections([...activeSections, sectionToAdd]);
      setAvailableAdditionalSections(availableAdditionalSections.filter(section => section.id !== newSectionId));
      setSelectedSection(newSectionId);
    }
  };

  const handleDeleteSection = (sectionId) => {
    const sectionToRemove = activeSections.find(section => section.id === sectionId);
    if (sectionToRemove) {
      setAvailableAdditionalSections([...availableAdditionalSections, sectionToRemove]);
  
      const newActiveSections = activeSections.filter(section => section.id !== sectionId);
      setActiveSections(newActiveSections);
  
      if (newActiveSections.length > 0) {
        setSelectedSection(newActiveSections[newActiveSections.length - 1].id);
      } else {
        setSelectedSection(sections[sections.length - 1]);
      }
    }
  };

  const renderForm = () => {
    const currentIndex = [...sections, ...activeSections.map(s => s.id)].indexOf(selectedSection);
    const isLastSection = currentIndex === [...sections, ...activeSections.map(s => s.id)].length - 1;

    switch (selectedSection) {
      case 'personal-details':
        return (
          <PersonalDetailsForm
            data={resumeData.personalDetails}
            onChange={(field, value) => handleInputChange('personalDetails', { ...resumeData.personalDetails, [field]: value })}
            onNext={handleNext}
          />
        );
      case 'contact-information':
        return (
          <ContactInformationForm
            data={resumeData.contactInformation}
            onChange={(field, value) => handleInputChange('contactInformation', { ...resumeData.contactInformation, [field]: value })}
            onNext={!isLastSection && handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'employment-history':
        return (
          <EmploymentHistoryForm
            data={resumeData.employmentHistory}
            onChange={(field, value) => handleInputChange('employmentHistory', { ...resumeData.employmentHistory, [field]: value })}
            onNext={!isLastSection && handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(field, value) => handleInputChange('skills', { ...resumeData.skills, [field]: value })}
            onNext={!isLastSection && handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(field, value) => handleInputChange('education', { ...resumeData.education, [field]: value })}
            onNext={!isLastSection && handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'professional-summary':
        return (
          <ProfessionalSummaryForm
            data={resumeData.professionalSummary}
            onChange={(field, value) => handleInputChange('professionalSummary', value)}
            onNext={!isLastSection && handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'internships':
        return (
          <InternshipForm
            data={resumeData.internships}
            onChange={(field, value) => handleInputChange('internships', { ...resumeData.internships, [field]: value })}
            onNext={!isLastSection && handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'courses':
        return (
          <CoursesForm
            data={resumeData.courses}
            onChange={(field, value) => handleInputChange('courses', { ...resumeData.courses, [field]: value })}
            onNext={!isLastSection && handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            data={resumeData.projects}
            onChange={(field, value) => handleInputChange('projects', { ...resumeData.projects, [field]: value })}
            onNext={!isLastSection && handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'references':
        return (
          <ReferencesForm
            data={resumeData.references}
            onChange={(field, value) => handleInputChange('references', { ...resumeData.references, [field]: value })}
            onNext={!isLastSection && handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'website-links':
        return (
          <WebsiteLinksForm
            data={resumeData.websiteLinks}
            onChange={(field, value) => handleInputChange('websiteLinks', { ...resumeData.websiteLinks, [field]: value })}
            onNext={!isLastSection && handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 'additional-section':
        return (
          <AdditionalSectionSelection
            availableSections={availableAdditionalSections}
            onAddSection={handleAddSection}
            onBack={handlePrevious}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar and Form Container */}
      <div className="flex w-2/5 h-full">
        {/* Sidebar */}
        <div className="w-1/5 bg-gray-200 overflow-y-auto text-sm">
          <Sidebar
            onSelectSection={setSelectedSection}
            activeSections={activeSections}
            onDeleteSection={handleDeleteSection}
          />
        </div>

        {/* Form Section */}
        <div className="w-4/5 p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Build Your Resume</h1>
          {renderForm()}
        </div>
      </div>

      {/* Preview Section */}
      <div className="flex w-3/5 h-full bg-gray-100 justify-center items-start">
        <ResumePreview data={resumeData} /> {/* Pass the data to the preview */}
      </div>
    </div>
  );
};

export default ResumeBuilder;
