// ResumeBuilder.js

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResume, updateField, addActiveSection, removeActiveSection } from '../redux/slices/resumeSlice';
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
import LanguageForm from '../components/forms/additionalSections/LanguageForm';
import HobbyForm from '../components/forms/additionalSections/HobbyForm';

const sections = [
  { id: 'personal-details', name: 'Personal Details' },
  { id: 'contact-information', name: 'Contact Information' },
  { id: 'employment-history', name: 'Employment History' },
  { id: 'skills', name: 'Skills' },
  { id: 'education', name: 'Education' },
  { id: 'professional-summary', name: 'Professional Summary' },
];

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  // Access resume data and status from Redux store
  const resumeData = useSelector((state) => state.resume);

  // Get activeSections and availableAdditionalSections from Redux state
  const activeSections = useSelector((state) => state.resume.activeSections);
  const availableAdditionalSections = useSelector(
    (state) => state.resume.availableAdditionalSections
  );

  const [selectedSection, setSelectedSection] = useState('personal-details');

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
    dispatch(updateField({ field, value }));
  };

  const handleNext = () => {
    const allSections = [
      ...sections.map((s) => s.id),
      ...activeSections.map((s) => s.id),
    ];
    const currentIndex = allSections.indexOf(selectedSection);
    if (currentIndex < allSections.length - 1) {
      setSelectedSection(allSections[currentIndex + 1]);
    }
  };

  const handlePrevious = () => {
    const allSections = [
      ...sections.map((s) => s.id),
      ...activeSections.map((s) => s.id),
    ];
    const currentIndex = allSections.indexOf(selectedSection);
    if (currentIndex > 0) {
      setSelectedSection(allSections[currentIndex - 1]);
    }
  };

  const handleAddSection = (newSectionId) => {
    const sectionToAdd = availableAdditionalSections.find(
      (section) => section.id === newSectionId
    );
    if (sectionToAdd) {
      dispatch(addActiveSection(sectionToAdd));
      setSelectedSection(newSectionId);
    }
  };

  const handleDeleteSection = (sectionId) => {
    // Create a copy of activeSections without the section to be removed
    const updatedActiveSections = activeSections.filter(
      (section) => section.id !== sectionId
    );
  
    // Dispatch the action to remove the section
    dispatch(removeActiveSection(sectionId));
  
    // Update selectedSection based on the updated activeSections
    if (updatedActiveSections.length > 0) {
      // Set selectedSection to the last item in updatedActiveSections
      setSelectedSection(updatedActiveSections[updatedActiveSections.length - 1].id);
    } else {
      // If no activeSections left, set selectedSection to the last fixed section
      setSelectedSection(sections[sections.length - 1].id);
    }
  };
  
  

  const renderForm = () => {
    const allSections = [
      ...sections.map((s) => s.id),
      ...activeSections.map((s) => s.id),
    ];
    const currentIndex = allSections.indexOf(selectedSection);
    const isLastSection = currentIndex === allSections.length - 1;

    const commonProps = {
      onNext: !isLastSection ? handleNext : undefined,
      onPrevious: currentIndex > 0 ? handlePrevious : undefined,
    };

    switch (selectedSection) {
      case 'personal-details':
        return (
          <PersonalDetailsForm
            data={resumeData.personalDetails}
            onChange={(field, value) =>
              handleInputChange('personalDetails', {
                ...resumeData.personalDetails,
                [field]: value,
              })
            }
            onNext={handleNext}
          />
        );
      case 'contact-information':
        return (
          <ContactInformationForm
            data={resumeData.contactInformation}
            onChange={(field, value) =>
              handleInputChange('contactInformation', {
                ...resumeData.contactInformation,
                [field]: value,
              })
            }
            {...commonProps}
          />
        );
      case 'employment-history':
        return (
          <EmploymentHistoryForm
            data={resumeData.employmentHistory}
            onChange={(field, value) =>
              handleInputChange('employmentHistory', value)
            }
            {...commonProps}
          />
        );
      case 'skills':
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(field, value) => handleInputChange('skills', value)}
            {...commonProps}
          />
        );
      case 'education':
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(field, value) => handleInputChange('education', value)}
            {...commonProps}
          />
        );
      case 'professional-summary':
        return (
          <ProfessionalSummaryForm
            data={resumeData.professionalSummary}
            onChange={(value) => handleInputChange('professionalSummary', value)}
            {...commonProps}
          />
        );
      case 'internships':
        return (
          <InternshipForm
            data={resumeData.internships}
            onChange={(field, value) =>
              handleInputChange('internships', value)
            }
            {...commonProps}
          />
        );
      case 'courses':
        return (
          <CoursesForm
            data={resumeData.courses}
            onChange={(field, value) => handleInputChange('courses', value)}
            {...commonProps}
          />
        );
      case 'projects':
        return (
          <ProjectsForm
            data={resumeData.projects}
            onChange={(field, value) => handleInputChange('projects', value)}
            {...commonProps}
          />
        );
      case 'languages':
        return (
          <LanguageForm
            data={resumeData.languages}
            onChange={(field, value) => handleInputChange('languages', value)}
            {...commonProps}
          />
        );
      case 'references':
        return (
          <ReferencesForm
            data={resumeData.references}
            onChange={(field, value) => handleInputChange('references', value)}
            {...commonProps}
          />
        );
      case 'website-links':
        return (
          <WebsiteLinksForm
            data={resumeData.websiteLinks}
            onChange={(field, value) =>
              handleInputChange('websiteLinks', value)
            }
            {...commonProps}
          />
        );

      case 'hobbies':
        return (
          <HobbyForm
            data={resumeData.hobbies}
            onChange={(field, value) => handleInputChange('hobbies', value)}
            {...commonProps}
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
            onDeleteSection={handleDeleteSection}
            selectedSection={selectedSection}
          />
        </div>

        {/* Form Section */}
        <div className="w-4/5 p-6 overflow-y-auto">
          {renderForm()}
        </div>
      </div>

      {/* Preview Section */}
      <div className="flex w-3/5 h-full bg-gray-100 justify-center items-start">
        <ResumePreview data={resumeData} />
      </div>
    </div>
  );
};

export default ResumeBuilder;
