import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addEducation, removeEducation } from '../../redux/slices/resumeSlice';

const EducationForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const education = useSelector((state) => state.resume.education);

  const [educationDetails, setEducationDetails] = useState({
    institute: '',
    degree: '',
    startDate: '',
    endDate: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationDetails({
      ...educationDetails,
      [name]: value,
    });
  };

  const handleAddEducation = () => {
    if (educationDetails.institute && educationDetails.degree) {
      dispatch(addEducation({ ...educationDetails }));
      setEducationDetails({
        institute: '',
        degree: '',
        startDate: '',
        endDate: '',
        location: '',
      });
    }
  };

  const handleDeleteEducation = (index) => {
    dispatch(removeEducation(index));
  };

  return (
    <div className="education-form">
      <h2>Education</h2>
      <form>
        <div>
          <label htmlFor="institute">Institute</label>
          <input
            type="text"
            id="institute"
            name="institute"
            value={educationDetails.institute}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="degree">Degree</label>
          <input
            type="text"
            id="degree"
            name="degree"
            value={educationDetails.degree}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={educationDetails.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={educationDetails.endDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={educationDetails.location}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleAddEducation}>
          Add Education
        </button>
      </form>
      <div>
        <h3>Current Education</h3>
        <ul>
          {education.map((edu, index) => (
            <li key={index}>
              {edu.degree} at {edu.institute} ({edu.startDate} - {edu.endDate})
              <button onClick={() => handleDeleteEducation(index)}>Delete</button>
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

export default EducationForm;
