

const sectionNames = {
  'courses': 'Courses',
  'internships': 'Internships',
  'projects': 'Projects',
  'references': 'References',
  'website-links': 'Website Links'
};

const Sidebar = ({ onSelectSection, activeSections, onDeleteSection }) => {
  return (
    <div className="sidebar w-1/4 p-4 bg-gray-200 min-h-screen">
      <ul className="space-y-2">
        <li>
          <button className="w-full text-left" onClick={() => onSelectSection('personal-details')}>
            Personal Details
          </button>
        </li>
        <li>
          <button className="w-full text-left" onClick={() => onSelectSection('contact-information')}>
            Contact Information
          </button>
        </li>
        <li>
          <button className="w-full text-left" onClick={() => onSelectSection('employment-history')}>
            Employment History
          </button>
        </li>
        <li>
          <button className="w-full text-left" onClick={() => onSelectSection('skills')}>
            Skills
          </button>
        </li>
        <li>
          <button className="w-full text-left" onClick={() => onSelectSection('education')}>
            Education
          </button>
        </li>

        {/* Dynamically added sections */}
        {activeSections.map((section) => (
          <li key={section.id} className="flex justify-between items-center">
            <button className="w-full text-left" onClick={() => onSelectSection(section.id)}>
              {sectionNames[section.id]}
            </button>
            <button onClick={() => onDeleteSection(section.id)} className="text-red-500">X</button>
          </li>
        ))}

        {/* "Add Section" button */}
        <li>
          <button className="w-full text-left font-bold" onClick={() => onSelectSection('additional-section')}>
            + Additional Section
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
