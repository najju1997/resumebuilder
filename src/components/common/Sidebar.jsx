import { useSelector } from 'react-redux';

const sectionNames = {
  'personal-details': 'Personal Details',
  'contact-information': 'Contact Information',
  'employment-history': 'Employment History',
  'skills': 'Skills',
  'education': 'Education',
  'professional-summary': 'Professional Summary',
  'courses': 'Courses',
  'internships': 'Internships',
  'projects': 'Projects',
  'references': 'References',
  'website-links': 'Website Links',
};

const Sidebar = ({ onSelectSection, onDeleteSection, selectedSection }) => {
  // Get activeSections from Redux state
  const activeSections = useSelector((state) => state.resume.activeSections);

  // Function to highlight the active section
  const hightlightSection = (sectionId) => {
    return selectedSection === sectionId ? 'bg-gray-400 text-black' : '';
  };

  return (
    <div className="sidebar w-1/4 p-4 bg-gray-200 min-h-screen">
      <ul className="space-y-2">
        {/* Fixed Sections */}
        <li className={hightlightSection('personal-details')}>
          <button
            className="w-full text-left"
            onClick={() => onSelectSection('personal-details')}
          >
            Personal Details
          </button>
        </li>
        <li className={hightlightSection('contact-information')}>
          <button
            className="w-full text-left"
            onClick={() => onSelectSection('contact-information')}
          >
            Contact Information
          </button>
        </li>
        <li className={hightlightSection('employment-history')}>
          <button
            className="w-full text-left"
            onClick={() => onSelectSection('employment-history')}
          >
            Employment History
          </button>
        </li>
        <li className={hightlightSection('skills')}>
          <button
            className="w-full text-left"
            onClick={() => onSelectSection('skills')}
          >
            Skills
          </button>
        </li>
        <li className={hightlightSection('education')}>
          <button
            className="w-full text-left"
            onClick={() => onSelectSection('education')}
          >
            Education
          </button>
        </li>
        <li className={hightlightSection('professional-summary')}>
          <button
            className="w-full text-left"
            onClick={() => onSelectSection('professional-summary')}
          >
            Professional Summary
          </button>
        </li>

        {/* Dynamically Added Sections */}
        {activeSections.map((section) => (
          <li
            key={section.id}
            className={`flex justify-between items-center ${hightlightSection(section.id)}`}
          >
            <button
              className="w-full text-left"
              onClick={() => onSelectSection(section.id)}
            >
              {sectionNames[section.id]}
            </button>
            <button
              onClick={() => onDeleteSection(section.id)}
              className="text-red-500"
            >
              X
            </button>
          </li>
        ))}

        {/* "Add Section" Button */}
        <li>
          <button
            className="w-full text-left font-bold"
            onClick={() => onSelectSection('additional-section')}
          >
            + Additional Section
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
