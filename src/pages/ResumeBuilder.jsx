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
import ProgressBar from '../components/common/ProgressBar';
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

      const remainingSections = [...sections, ...activeSections.map(s => s.id).filter(id => id !== sectionId)];
      setSelectedSection(remainingSections[remainingSections.length - 1]);
    }
  };

  const renderForm = () => {
    const currentIndex = [...sections, ...activeSections.map(s => s.id)].indexOf(selectedSection);
    const isLastSection = currentIndex === [...sections, ...activeSections.map(s => s.id)].length - 1;
    const isFirstSection = currentIndex === 0;

    switch (selectedSection) {
      case 'personal-details':
        return <PersonalDetailsForm onNext={handleNext} />;
      case 'contact-information':
        return <ContactInformationForm onNext={!isLastSection && handleNext} onPrevious={!isFirstSection && handlePrevious} />;
      case 'employment-history':
        return <EmploymentHistoryForm onNext={!isLastSection && handleNext} onPrevious={!isFirstSection && handlePrevious} />;
      case 'skills':
        return <SkillsForm onNext={!isLastSection && handleNext} onPrevious={!isFirstSection && handlePrevious} />;
      case 'education':
        return <EducationForm onNext={!isLastSection && handleNext} onPrevious={!isFirstSection && handlePrevious} />;
      case 'internships':
        return <InternshipForm onNext={!isLastSection && handleNext} onPrevious={!isFirstSection && handlePrevious} />;
      case 'courses':
        return <CoursesForm onNext={!isLastSection && handleNext} onPrevious={!isFirstSection && handlePrevious} />;
      case 'projects':
        return <ProjectsForm onNext={!isLastSection && handleNext} onPrevious={!isFirstSection && handlePrevious} />;
      case 'references':
        return <ReferencesForm onNext={!isLastSection && handleNext} onPrevious={!isFirstSection && handlePrevious} />;
      case 'website-links':
        return <WebsiteLinksForm onNext={!isLastSection && handleNext} onPrevious={!isFirstSection && handlePrevious} />;
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
    <div className="resume-builder flex">
      <Sidebar
        onSelectSection={setSelectedSection}
        activeSections={activeSections}
        onDeleteSection={handleDeleteSection}
      />
      <div className="form-container w-2/3 p-4">
        <h1 className="text-3xl font-bold mb-6">Build Your Resume</h1>
        <ProgressBar />
        {renderForm()}
      </div>
      <div className="preview-container w-1/3 p-4 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-4">Resume Preview</h2>
        <ResumePreview />
      </div>
    </div>
  );
};

export default ResumeBuilder;
