import { useState } from 'react';
import PersonalDetailsForm from '../components/forms/PersonalDetailsForm';
import ContactInformationForm from '../components/forms/ContactInformationForm';
import EmploymentHistoryForm from '../components/forms/EmploymentHistoryForm';
import SkillsForm from '../components/forms/SkillsForm';
import EducationForm from '../components/forms/EducationForm';
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
  const [activeSections, setActiveSections] = useState([]);
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
      setActiveSections(activeSections.filter(section => section.id !== sectionId));
      if (selectedSection === sectionId) {
        setSelectedSection('personal-details');
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
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden w-full flex justify-between p-4 bg-gray-200">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-xl">
          ☰
        </button>
        <button onClick={() => setIsPreviewOpen(!isPreviewOpen)} className="text-xl">
          Preview
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:relative bg-gray-200 h-full z-20 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out w-1/5`}
      >
        <button
          className="md:hidden absolute top-4 right-4 text-xl"
          onClick={() => setIsSidebarOpen(false)}
        >
          ✕
        </button>
        <Sidebar
          onSelectSection={setSelectedSection}
          activeSections={activeSections}
          onDeleteSection={handleDeleteSection}
        />
      </div>

      {/* Form Section */}
      <div className="w-full md:w-2/5 p-6 h-full overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Build Your Resume</h1>
        {renderForm()}
      </div>

      {/* Preview Section */}
      <div
        className={`fixed md:relative z-20 transform ${
          isPreviewOpen ? 'translate-x-0' : 'translate-x-full'
        } md:translate-x-0 transition-transform duration-200 ease-in-out bg-gray-100 h-full w-full md:w-2/5 flex justify-center items-start`}
      >
        <button
          className="md:hidden absolute top-4 right-4 text-xl"
          onClick={() => setIsPreviewOpen(false)}
        >
          ✕
        </button>
        <div className="bg-white shadow-md w-full max-w-[210mm] h-full max-h-[297mm] p-8">
          <ResumePreview />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
