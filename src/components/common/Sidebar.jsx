import { useSelector } from 'react-redux';
import { FaTrash } from 'react-icons/fa';

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
  const highlightSection = (sectionId) => {
    return selectedSection === sectionId
      ? 'bg-blue-500 text-white font-semibold rounded-lg shadow-md'  // Rounded corners and shadow for selected
      : 'text-gray-800 hover:bg-gray-300 rounded-lg';  // Rounded corners for unselected sections
  };
  

  return (
    <div className="sidebar p-4 bg-gradient-to-b from-gray-100 to-gray-300 min-h-screen shadow-lg">
      <ul className="space-y-3">
        {/* Fixed Sections */}
        <li className={highlightSection('personal-details')}>
          <button
            className="w-full text-left py-2 px-3 rounded-lg transition duration-200"
            onClick={() => onSelectSection('personal-details')}
          >
            Personal Details
          </button>
        </li>
        <li className={highlightSection('contact-information')}>
          <button
            className="w-full text-left py-2 px-3 rounded-lg transition duration-200"
            onClick={() => onSelectSection('contact-information')}
          >
            Contact Information
          </button>
        </li>
        <li className={highlightSection('employment-history')}>
          <button
            className="w-full text-left py-2 px-3 rounded-lg transition duration-200"
            onClick={() => onSelectSection('employment-history')}
          >
            Employment History
          </button>
        </li>
        <li className={highlightSection('skills')}>
          <button
            className="w-full text-left py-2 px-3 rounded-lg transition duration-200"
            onClick={() => onSelectSection('skills')}
          >
            Skills
          </button>
        </li>
        <li className={highlightSection('education')}>
          <button
            className="w-full text-left py-2 px-3 rounded-lg transition duration-200"
            onClick={() => onSelectSection('education')}
          >
            Education
          </button>
        </li>
        <li className={highlightSection('professional-summary')}>
          <button
            className="w-full text-left py-2 px-3 rounded-lg transition duration-200"
            onClick={() => onSelectSection('professional-summary')}
          >
            Professional Summary
          </button>
        </li>

        {/* Dynamically Added Sections */}
        {activeSections.map((section) => (
          <li
            key={section.id}
            className={`flex justify-between items-center ${highlightSection(
              section.id
            )}`}
          >
            <button
              className="w-full text-left py-2 px-3 rounded-lg transition duration-200"
              onClick={() => onSelectSection(section.id)}
            >
              {sectionNames[section.id]}
            </button>
            <button
              onClick={() => onDeleteSection(section.id)}
              className="text-red-500 hover:text-red-700 transition duration-200 p-2"
            >
              <FaTrash />
            </button>

          </li>
        ))}

        {/* "Add Section" Button */}
        <li>
          <button
            className="w-full text-left py-2 px-3 rounded-lg font-bold bg-green-500 text-white hover:bg-green-600 transition duration-300"
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
