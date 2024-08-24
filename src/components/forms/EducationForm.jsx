import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addEducation, removeEducation, updateEducation } from '../../redux/slices/resumeSlice';
import { validateEndDate } from '../../utils/dateValidation';
import { format } from 'date-fns';

const EducationForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.resume.education);

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [dateError, setDateError] = useState(false);

  useEffect(() => {
    setExpandedIndex(null);
  }, []);

  const handleDateChange = (date, index, field) => {
    const formattedDate = date ? format(date, 'MMM yyyy') : '';
    const updatedEducation = { ...education[index], [field]: formattedDate };

    if (field === 'startDate' || field === 'endDate') {
      const isValid = validateEndDate(updatedEducation.startDate, updatedEducation.endDate);
      setDateError(!isValid);
    }

    dispatch(updateEducation({ index, ...updatedEducation }));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEducation = { ...education[index], [name]: value };
    dispatch(updateEducation({ index, ...updatedEducation }));
  };

  const handleDeleteEducation = (index) => {
    dispatch(removeEducation(index));
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const handleAddMoreClick = () => {
    dispatch(addEducation({
      institute: '',
      degree: '',
      startDate: '',
      endDate: '',
      location: '',
    }));
    setExpandedIndex(education.length);
  };

  const toggleExpandCollapse = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="education-form">
      <h2 className="text-2xl font-semibold mb-4">Education</h2>

      {education.map((edu, index) => (
        <div key={index} className="border rounded-lg mb-4 shadow-sm">
          <div
            className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
            onClick={() => toggleExpandCollapse(index)}
          >
            <div>
              <strong className="text-lg">{edu.degree || "Untitled"}</strong> at {edu.institute || ""}
            </div>
            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteEducation(index);
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
                  <label htmlFor="institute" className="block text-sm font-medium text-gray-700">Institute</label>
                  <input
                    type="text"
                    id="institute"
                    name="institute"
                    value={edu.institute}
                    placeholder="Enter your institute"
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Degree</label>
                  <input
                    type="text"
                    id="degree"
                    name="degree"
                    value={edu.degree}
                    placeholder="Enter your degree"
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                  <DatePicker
                    selected={edu.startDate ? new Date(edu.startDate) : null}
                    onChange={(date) => handleDateChange(date, index, 'startDate')}
                    dateFormat="MMM yyyy"
                    showMonthYearPicker
                    placeholderText="Select Start Date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
                  <DatePicker
                    selected={edu.endDate ? new Date(edu.endDate) : null}
                    onChange={(date) => handleDateChange(date, index, 'endDate')}
                    dateFormat="MMM yyyy"
                    showMonthYearPicker
                    placeholderText="Select End Date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                  {dateError && (
                    <p className="text-red-500 text-sm mt-2">End date cannot be before start date.</p>
                  )}
                </div>
                <div className="mb-4">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={edu.location}
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
        Add More Education
      </button>

      <div className="flex justify-between mt-4">
        <button onClick={onPrevious} className="bg-gray-500 text-white py-2 px-4 rounded-md">Previous</button>
        <button onClick={onNext} className="bg-blue-500 text-white py-2 px-4 rounded-md">Next</button>
      </div>
    </div>
  );
};

export default EducationForm;
