import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addCourse, removeCourse } from '../../../redux/slices/resumeSlice';

const CoursesForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.resume.additionalSections.courses);

  const [courseDetails, setCourseDetails] = useState({
    courseName: '',
    institution: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails({
      ...courseDetails,
      [name]: value,
    });
  };

  const handleAddCourse = () => {
    if (courseDetails.courseName && courseDetails.institution) {
      dispatch(addCourse({ ...courseDetails }));
      setCourseDetails({
        courseName: '',
        institution: '',
        startDate: '',
        endDate: '',
      });
    }
  };

  const handleDeleteCourse = (index) => {
    dispatch(removeCourse(index));
  };

  return (
    <div className="courses-form">
      <h2>Courses</h2>
      <form>
        <div>
          <label htmlFor="courseName">Course Name</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={courseDetails.courseName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="institution">Institution</label>
          <input
            type="text"
            id="institution"
            name="institution"
            value={courseDetails.institution}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={courseDetails.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={courseDetails.endDate}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleAddCourse}>
          Add Course
        </button>
      </form>
      <div>
        <h3>Current Courses</h3>
        <ul>
          {courses.map((course, index) => (
            <li key={index}>
              {course.courseName} at {course.institution} ({course.startDate} - {course.endDate})
              <button onClick={() => handleDeleteCourse(index)}>Delete</button>
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

export default CoursesForm;
