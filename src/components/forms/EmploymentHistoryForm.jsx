import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEmploymentHistory, updateEmploymentHistory, removeEmploymentHistory } from '../../redux/slices/resumeSlice';
import DateRangeInput from '../common/DateRangeInput';

const EmploymentHistoryForm = ({ onNext, onPrevious, isLastForm }) => {
  const dispatch = useDispatch();
  const employmentHistory = useSelector((state) => state.resume.employmentHistory);

  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    setExpandedIndex(null); // Collapse all sections when the form is loaded or refreshed
  }, []);

  const handleDateChange = (value, field, index) => {
    const updatedJob = {
      ...employmentHistory[index],
      [field]: value,
      currentlyWorking: value === 'Present',
    };
    dispatch(updateEmploymentHistory({ index, ...updatedJob }));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedJob = { ...employmentHistory[index], [name]: value };
    dispatch(updateEmploymentHistory({ index, ...updatedJob }));
  };

  const handleDeleteJob = (index) => {
    dispatch(removeEmploymentHistory(index));
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const handleAddMoreClick = () => {
    dispatch(addEmploymentHistory({
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      location: '',
      currentlyWorking: false,
    }));
    setExpandedIndex(employmentHistory.length);
  };

  const toggleExpandCollapse = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="employment-history-form">
      <h2 className="text-2xl font-semibold mb-4">Employment History</h2>

      {employmentHistory.map((job, index) => (
        <div key={index} className="border rounded-lg mb-4 shadow-sm">
          <div
            className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
            onClick={() => toggleExpandCollapse(index)}
          >
            <div>
              <strong className="text-lg">{job.jobTitle || "Untitled Job"}</strong> at {job.company || ""}
            </div>
            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteJob(index);
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
                    value={job.jobTitle}
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
                    value={job.company}
                    placeholder="Enter the company name"
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <DateRangeInput
                  startDate={job.startDate}
                  endDate={job.endDate}
                  currentlyWorking={job.currentlyWorking}
                  onDateChange={(value, field) => handleDateChange(value, field, index)}
                />
                <div className="mb-4">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={job.location}
                    placeholder="Enter the location"
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="experiencePoints" className="block text-sm font-medium text-gray-700">Experience Bullet Points</label>
                  <textarea
                    id="experiencePoints"
                    name="experiencePoints"
                    value={job.experiencePoints}
                    placeholder="Describe your role and achievements"
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

export default EmploymentHistoryForm;
