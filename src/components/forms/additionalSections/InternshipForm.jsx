import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addInternship, updateInternship, removeInternship } from '../../../redux/slices/resumeSlice';
import DateRangeInput from '../../common/DateRangeInput';

const InternshipForm = ({ onNext, onPrevious, isLastForm }) => {
  const dispatch = useDispatch();
  const internships = useSelector((state) => state.resume.additionalSections.internships);

  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    setExpandedIndex(null); // Collapse all sections when the form is loaded or refreshed
  }, []);

  const handleDateChange = (value, field, index) => {
    const updatedInternship = { 
      ...internships[index], 
      [field]: value, 
      currentlyWorking: value === 'Present' 
    };
    dispatch(updateInternship({ index, ...updatedInternship }));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedInternship = { ...internships[index], [name]: value };
    dispatch(updateInternship({ index, ...updatedInternship }));
  };

  const handleDeleteInternship = (index) => {
    dispatch(removeInternship(index));
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const handleAddMoreClick = () => {
    dispatch(addInternship({
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      location: '',
      currentlyWorking: false,
    }));
    setExpandedIndex(internships.length);
  };

  const toggleExpandCollapse = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="internship-form">
      <h2 className="text-2xl font-semibold mb-4">Internships</h2>

      {internships.map((internship, index) => (
        <div key={index} className="border rounded-lg mb-4 shadow-sm">
          <div
            className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
            onClick={() => toggleExpandCollapse(index)}
          >
            <div>
              <strong className="text-lg">{internship.jobTitle || "Untitled Internship"}</strong> at {internship.company || ""}
            </div>
            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteInternship(index);
                }}
                className="text-red-500 mr-4"
              >
                Delete
              </button>
              {expandedIndex === index ? (
                <button className="text-blue-500">Collapse</button>
              ) : (
                <button className="text-blue-500">Expand</button>
              )}
            </div>
          </div>
          {expandedIndex === index && (
            <div className="p-4 bg-white">
              <form>
                <div className="mb-4">
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
                  <input
                    type="text"
                    id="jobTitle"
                    name="jobTitle"
                    value={internship.jobTitle}
                    placeholder="Enter your job title"
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700">Company</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={internship.company}
                    placeholder="Enter the company name"
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <DateRangeInput
                  startDate={internship.startDate}
                  endDate={internship.endDate}
                  currentlyWorking={internship.currentlyWorking}
                  onDateChange={(value, field) => handleDateChange(value, field, index)}
                />
                <div className="mb-4">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={internship.location}
                    placeholder="Enter the location"
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
              </form>
            </div>
          )}
        </div>
      ))}

      <button onClick={handleAddMoreClick} className="bg-green-500 text-white py-2 px-4 rounded-md mt-4">
        Add Record
      </button>
      <div className="flex justify-between mt-4">
        <button onClick={onPrevious} className="btn btn-secondary">Previous</button>
        {!isLastForm && <button onClick={onNext} className="btn btn-primary">Next</button>}
      </div>
    </div>
  );
};

export default InternshipForm;
