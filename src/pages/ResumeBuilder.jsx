import { useState } from 'react';
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
  const [selectedSection, setSelectedSection] = useState('personal-details');
  const [activeSections, setActiveSections] = useState([]); // active or selected from additional section
  const [availableAdditionalSections, setAvailableAdditionalSections] = useState(allAdditionalSections);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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
        // Select the last default section by string if no additional sections are left
        setSelectedSection(sections[sections.length - 1]);
      }
    }
  };
  

  const renderForm = () => {
    const currentIndex = [...sections, ...activeSections.map(s => s.id)].indexOf(selectedSection);
    const isLastSection = currentIndex === [...sections, ...activeSections.map(s => s.id)].length - 1;

    switch (selectedSection) {
      case 'personal-details':
        return <PersonalDetailsForm onNext={handleNext} />;
      case 'contact-information':
        return <ContactInformationForm onNext={!isLastSection && handleNext} onPrevious={handlePrevious} />;
      case 'employment-history':
        return <EmploymentHistoryForm onNext={!isLastSection && handleNext} onPrevious={handlePrevious} />;
      case 'skills':
        return <SkillsForm onNext={!isLastSection && handleNext} onPrevious={handlePrevious} />;
      case 'education':
        return <EducationForm onNext={!isLastSection && handleNext} onPrevious={handlePrevious} />;
      case 'professional-summary':
        return <ProfessionalSummaryForm onNext={!isLastSection && handleNext} onPrevious={handlePrevious} />;
      case 'internships':
        return <InternshipForm onNext={!isLastSection && handleNext} onPrevious={handlePrevious} />;
      case 'courses':
        return <CoursesForm onNext={!isLastSection && handleNext} onPrevious={handlePrevious} />;
      case 'projects':
        return <ProjectsForm onNext={!isLastSection && handleNext} onPrevious={handlePrevious} />;
      case 'references':
        return <ReferencesForm onNext={!isLastSection && handleNext} onPrevious={handlePrevious} />;
      case 'website-links':
        return <WebsiteLinksForm onNext={!isLastSection && handleNext} onPrevious={handlePrevious} />;
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
    <ResumePreview />
  </div>
</div>



  );
  
};

export default ResumeBuilder;
