import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEmploymentHistory, updateEmploymentHistory, removeEmploymentHistory } from '../../redux/slices/resumeSlice';
import { getAISuggestions } from '../../api/resumeapi';
import DateRangeInput from '../common/DateRangeInput';
import { useParams } from 'react-router-dom';
import { FaPlus, FaCheck, FaSpinner,FaSyncAlt, FaMagic } from 'react-icons/fa'; // For icons
import DeletePopup from '../common/DeletePopup'; // Import the DeletePopup

const EmploymentHistoryForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const employmentHistory = useSelector((state) => state.resume.employmentHistory);
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [selectedJobIndex, setSelectedJobIndex] = useState(null);
  const [selectedSuggestions, setSelectedSuggestions] = useState({}); // Track selected AI suggestions
  const [Error, setError] = useState(''); // Track validation errors
  const [showPopup, setShowPopup] = useState(false); // Track popup visibility
  const [deleteIndex, setDeleteIndex] = useState(null); // Track index of the hobby to delete
  const token = localStorage.getItem('token');

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
    const updatedJob = {
      ...employmentHistory[index],
      [name]: name === 'experiencePoints' ? value.split('\n') : value, // Split by new lines when updating experiencePoints
    };
    dispatch(updateEmploymentHistory({ index, ...updatedJob }));
  };

  // Validation for AI Magic Button
  const isValidForAIMagic = (job) => {
    return job.jobTitle && job.jobField
  };

  // Function to handle the "AI Magic" button click
  const handleAIMagicClick = async (jobIndex) => {
    const job = employmentHistory[jobIndex];

    // Validate Job Title, Job Field, and Experience Points
    if (!isValidForAIMagic(job)) {
      return;
    }

    setLoading(true); // Start loading
    setError('');  // Clear any previous validation errors
    try {
      const suggestions = await getAISuggestions(resumeId, jobIndex, token);
      setAiSuggestions(suggestions); // Store the suggestions in state
      setSelectedJobIndex(jobIndex); // Track the job where AI Magic was clicked
    } catch (error) {
      setError('Error generating Bullet Points. Refresh the page.')
      console.error('Error fetching AI suggestions:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const toggleAISuggestion = (suggestion, jobIndex) => {
    const job = employmentHistory[jobIndex];
    let updatedExperiencePoints;

    // If the suggestion is already in the experience points, remove it
    if (job.experiencePoints.includes(suggestion)) {
      updatedExperiencePoints = job.experiencePoints.filter((point) => point !== suggestion);
      setSelectedSuggestions((prev) => ({ ...prev, [suggestion]: false }));
    } else {
      // Otherwise, add the suggestion to experience points
      updatedExperiencePoints = [...job.experiencePoints, suggestion];
      setSelectedSuggestions((prev) => ({ ...prev, [suggestion]: true }));
    }

    // Update the Redux state with the new experience points
    const updatedJob = {
      ...job,
      experiencePoints: updatedExperiencePoints,
    };
    dispatch(updateEmploymentHistory({ index: jobIndex, ...updatedJob }));
  };

  const handleDeleteJob = (index, job) => {
    // Check if the job is valid for AI Magic
    if (!isValidForAIMagic(job)) {
      // Directly delete the job without showing the popup
      dispatch(removeEmploymentHistory(index)); 
      setAiSuggestions([]); // Clear AI suggestions after deletion
      if (expandedIndex === index) {
        setExpandedIndex(null); // Collapse the section if it's expanded
      }
    } else {
      // If valid, show the confirmation pop-up
      setDeleteIndex(index); // Set the index of the job to delete
      setShowPopup(true);    // Show the confirmation pop-up
      setAiSuggestions([]);  // Clear AI suggestions
      // if (expandedIndex === index) {
      //   setExpandedIndex(null); // Collapse the section if it's expanded
      // }
    }
  };
  

  const handleDeleteConfirmation = (choice) => {
    if (choice === 'yes') {
      dispatch(removeEmploymentHistory(deleteIndex)); // Remove hobby if "Yes" is confirmed
    }
    setShowPopup(false); // Hide the pop-up regardless of the choice
  };

  const handleAddMoreClick = () => {
    dispatch(addEmploymentHistory({
      jobTitle: '',
      company: '',
      jobField: '',  // Keep jobField intact
      startDate: '',
      endDate: '',
      location: '',
      experiencePoints: [],
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
                  handleDeleteJob(index, job);
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
                <div className="mb-4">
                  <label htmlFor="jobField" className="block text-sm font-medium text-gray-700">Job Field</label>
                  <input
                    type="text"
                    id="jobField"
                    name="jobField"
                    value={job.jobField || ''}  // Bind value to jobField
                    placeholder="Enter the field of your job (e.g., Marketing, Engineering)"
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
                    name="experiencePoints"
                    value={Array.isArray(job.experiencePoints) ? job.experiencePoints.join('\n') : ''}
                    onChange={(e) => handleChange(e, index)}
                    placeholder="Enter bullet points, one per line"
                    rows={10}  // Increase the height of the textarea
                    className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>

                {/* AI Magic / Refresh Button */}
                {/* AI Magic / Refresh Button */}
                <button
                  type="button"
                  onClick={() => handleAIMagicClick(index)}
                  className={`${
                    aiSuggestions.length > 0 ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-500 hover:bg-purple-600'
                  } text-white py-2 px-4 rounded-md mb-4 transition duration-300 flex items-center justify-center ${
                    loading || !isValidForAIMagic(job) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  disabled={loading || !isValidForAIMagic(job)}  // Disable button while loading or invalid job
                >
                  {loading ? (
                    <FaSpinner className="animate-spin mr-2" />  // Show spinner while loading
                  ) : (
                    aiSuggestions.length > 0 ? (
                      <FaSyncAlt className="mr-2" />  // Show Refresh icon if suggestions exist
                    ) : (
                      <FaMagic className="mr-2" />  // Show Magic wand icon when no suggestions yet
                    )
                  )}
                  {loading ? 'Loading...' : aiSuggestions.length > 0 ? 'Refresh' : 'AI Magic'}
                </button>


                {/* Display validation message if requirements are not met */}
                {!isValidForAIMagic(job) && (
                  <p className="text-sm text-red-500 mt-2">
                    Ops! Fill Job Title and Job Field.
                  </p>
                )}

                {/* Show validation error if present */}
                {Error && (
                  <p className="text-sm text-red-500 mt-2">{Error}</p>
                )}

                {/* Display AI Suggestions if this job's AI Magic button was clicked */}
                {selectedJobIndex === index && aiSuggestions.length > 0 && (
                  <div className="ai-suggestions border border-gray-300 rounded-md p-4">
                    <h4 className="text-lg font-semibold mb-2">AI Suggestions</h4>
                    {aiSuggestions.map((suggestion, idx) => (
                      <div key={idx} className="flex justify-between items-center mb-2">
                        <p className="text-gray-700">{suggestion}</p>
                        <button
                          type="button"
                          onClick={() => toggleAISuggestion(suggestion, index)}
                          className="text-green-500 hover:text-green-700 transition duration-300"
                        >
                          {selectedSuggestions[suggestion] ? <FaCheck /> : <FaPlus />}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      ))}

      <button onClick={handleAddMoreClick} className="bg-green-500 text-white py-2 px-4 rounded-md mt-4">
        Add Record
      </button>
      <div className="flex justify-between mt-4">
        <button onClick={onPrevious} className="bg-gray-500 text-white py-2 px-4 rounded-md">Previous</button>
        {onNext && <button onClick={onNext} className="bg-blue-500 text-white py-2 px-4 rounded-md">Next</button>}
      </div>

      {/* Render DeletePopup only when showPopup is true */}
      {showPopup && <DeletePopup onConfirm={handleDeleteConfirmation} />}
    </div>
  );
};

export default EmploymentHistoryForm;
