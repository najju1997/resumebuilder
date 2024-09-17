// Sidebar.js

import React from 'react';
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

const Sidebar = ({ onSelectSection, onDeleteSection }) => {
  // Get activeSections from Redux state
  const activeSections = useSelector((state) => state.resume.activeSections);

  return (
    <div className="sidebar w-1/4 p-4 bg-gray-200 min-h-screen">
      <ul className="space-y-2">
        {/* Fixed Sections */}
        <li>
          <button className="w-full text-left" onClick={() => onSelectSection('personal-details')}>
            Personal Details
          </button>
        </li>
        {/* ... other fixed sections ... */}
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
        <li>
          <button className="w-full text-left" onClick={() => onSelectSection('professional-summary')}>
            Professional Summary
          </button>
        </li>

        {/* Dynamically Added Sections */}
        {activeSections.map((section) => (
          <li key={section.id} className="flex justify-between items-center">
            <button className="w-full text-left" onClick={() => onSelectSection(section.id)}>
              {sectionNames[section.id]}
            </button>
            <button
              onClick={() => onDeleteSection(section.id)} // Use the prop function
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
