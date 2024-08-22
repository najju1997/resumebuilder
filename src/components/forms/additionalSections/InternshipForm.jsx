import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addInternship, removeInternship } from '../../../redux/slices/resumeSlice';

const InternshipForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const internships = useSelector((state) => state.resume.additionalSections.internships);

  const [internshipDetails, setInternshipDetails] = useState({
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInternshipDetails({
      ...internshipDetails,
      [name]: value,
    });
  };

  const handleAddInternship = () => {
    if (internshipDetails.jobTitle && internshipDetails.company) {
      dispatch(addInternship({ ...internshipDetails }));
      setInternshipDetails({
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        location: '',
      });
    }
  };

  const handleDeleteInternship = (index) => {
    dispatch(removeInternship(index));
  };

  return (
    <div className="internship-form">
      <h2>Internships</h2>
      <form>
        <div>
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={internshipDetails.jobTitle}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            value={internshipDetails.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={internshipDetails.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={internshipDetails.endDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={internshipDetails.location}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleAddInternship}>
          Add Internship
        </button>
      </form>
      <div>
        <h3>Current Internships</h3>
        <ul>
          {internships.map((internship, index) => (
            <li key={index}>
              {internship.jobTitle} at {internship.company} ({internship.startDate} - {internship.endDate})
              <button onClick={() => handleDeleteInternship(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between mt-6">
        <button onClick={onPrevious} className="btn btn-secondary">Previous</button>
        {onNext && <button onClick={onNext} className="btn btn-primary">Next</button>}
      </div>
    </div>
  );
};

export default InternshipForm;
