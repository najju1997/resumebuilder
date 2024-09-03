import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { addCourse, updateCourse, removeCourse } from '../../../redux/slices/resumeSlice';
import { validateEndDate, validateStartDate } from '../../../utils/dateValidation';
import { format, parse } from 'date-fns';

const CoursesForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.resume.courses);

  const [expandedIndex, setExpandedIndex] = useState(null);
  const [dateError, setDateError] = useState(null);

  useEffect(() => {
    setExpandedIndex(null);
  }, []);

  const handleDateChange = (date, index, field) => {
    const formattedDate = date ? format(date, 'MMM yyyy') : '';
    const updatedCourse = { ...courses[index], [field]: formattedDate };

    if (field === 'startDate' && updatedCourse.endDate && updatedCourse.endDate !== 'Present') {
      if (!validateStartDate(formattedDate, updatedCourse.endDate)) {
        setDateError('Start date cannot be after end date.');
        return;
      } else {
        setDateError(null);
      }
    }

    if (field === 'endDate' && updatedCourse.startDate && updatedCourse.endDate !== 'Present') {
      if (!validateEndDate(updatedCourse.startDate, formattedDate)) {
        setDateError('End date cannot be before start date.');
        return;
      } else {
        setDateError(null);
      }
    }

    dispatch(updateCourse({ index, ...updatedCourse }));
  };

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    let updatedValue = value;

    if (type === 'checkbox') {
      if (name === 'currentlyEnrolled') {
        updatedValue = checked;
        const updatedCourse = { ...courses[index], 'currentlyEnrolled': checked };
        if (checked) {
          updatedCourse.endDate = 'Present';
        } else {
          updatedCourse.endDate = '';
        }
        dispatch(updateCourse({ index, ...updatedCourse }));
        setDateError(null);
        return;
      }
    }

    const updatedCourse = { ...courses[index], [name]: updatedValue };
    dispatch(updateCourse({ index, ...updatedCourse }));
  };

  const handleDeleteCourse = (index) => {
    dispatch(removeCourse(index));
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const handleAddMoreClick = () => {
    dispatch(addCourse({
      courseName: '',
      institution: '',
      startDate: '',
      endDate: '',
      currentlyEnrolled: false,
    }));
    setExpandedIndex(courses.length);
  };

  const toggleExpandCollapse = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="courses-form">
      <h2 className="text-2xl font-semibold mb-4">Courses</h2>

      {courses.map((course, index) => (
        <div key={index} className="border rounded-lg mb-4 shadow-sm">
          <div
            className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
            onClick={() => toggleExpandCollapse(index)}
          >
            <div>
              <strong className="text-lg">{course.courseName || "Untitled Course"}</strong> at {course.institution || ""}
            </div>
            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCourse(index);
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
                  <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">Course Name</label>
                  <input
                    type="text"
                    id="courseName"
                    name="courseName"
                    value={course.courseName}
                    placeholder="Enter the course name"
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Institution</label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={course.institution}
                    placeholder="Enter the institution name"
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                  <DatePicker
                    selected={course.startDate ? parse(course.startDate, 'MMM yyyy', new Date()) : null}
                    onChange={(date) => handleDateChange(date, index, 'startDate')}
                    dateFormat="MMM yyyy"
                    showMonthYearPicker
                    placeholderText="Select Start Date"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">End Date</label>
                  <div className="flex items-center">
                    <div className="flex-1">
                      {!course.currentlyEnrolled && (
                        <DatePicker
                          selected={course.endDate && course.endDate !== 'Present' ? parse(course.endDate, 'MMM yyyy', new Date()) : null}
                          onChange={(date) => handleDateChange(date, index, 'endDate')}
                          dateFormat="MMM yyyy"
                          showMonthYearPicker
                          placeholderText="Select End Date"
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                          disabled={course.currentlyEnrolled}
                        />
                      )}
                      {course.currentlyEnrolled && (
                        <input
                          type="text"
                          value="Present"
                          readOnly
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 bg-gray-100"
                        />
                      )}
                      {dateError && (
                        <p className="text-red-500 text-sm mt-2">{dateError}</p>
                      )}
                    </div>
                    <div className="ml-4">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          name="currentlyEnrolled"
                          checked={course.currentlyEnrolled || false}
                          onChange={(e) => handleChange(e, index)}
                          className="form-checkbox h-4 w-4 text-blue-600"
                        />
                        <span className="ml-2 text-gray-700">Present</span>
                      </label>
                    </div>
                  </div>
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
      <button onClick={onPrevious} className="bg-gray-500 text-white py-2 px-4 rounded-md">Previous</button>
      {onNext && <button onClick={onNext} className="bg-blue-500 text-white py-2 px-4 rounded-md">Next</button>}
      </div>
    </div>
  );
};

export default CoursesForm;
