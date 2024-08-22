import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEmploymentHistory, removeEmploymentHistory } from '../../redux/slices/resumeSlice';

const EmploymentHistoryForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const employmentHistory = useSelector((state) => state.resume.employmentHistory);

  const [jobDetails, setJobDetails] = useState({
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    location: '',
    experiencePoints: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({
      ...jobDetails,
      [name]: value,
    });
  };

  const handleAddExperience = () => {
    if (jobDetails.jobTitle && jobDetails.company) {
      dispatch(addEmploymentHistory({ ...jobDetails }));
      setJobDetails({
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        location: '',
        experiencePoints: '',
      });
    }
  };

  const handleDeleteExperience = (index) => {
    dispatch(removeEmploymentHistory(index));
  };

  return (
    <div className="employment-history-form">
      <h2>Employment History</h2>
      <form>
        <div>
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={jobDetails.jobTitle}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={jobDetails.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={jobDetails.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={jobDetails.endDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={jobDetails.location}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="experiencePoints">Experience Bullet Points</label>
          <textarea
            id="experiencePoints"
            name="experiencePoints"
            value={jobDetails.experiencePoints}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleAddExperience}>
          Add Experience
        </button>
      </form>
      <div>
        <h3>Current Employment History</h3>
        <ul>
          {employmentHistory.map((job, index) => (
            <li key={index}>
              {job.jobTitle} at {job.company} ({job.startDate} - {job.endDate})
              <button onClick={() => handleDeleteExperience(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between mt-4">
          <button onClick={onPrevious} className="btn btn-secondary">Previous</button>
          <button onClick={onNext} className="btn btn-primary">Next</button>
        </div>
    </div>
  );
};

export default EmploymentHistoryForm;
