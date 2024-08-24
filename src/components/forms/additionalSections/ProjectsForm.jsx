import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProject, updateProject, removeProject } from '../../../redux/slices/resumeSlice';
import DateRangeInput from '../../common/DateRangeInput';

const ProjectsForm = ({ onNext, onPrevious, isLastForm }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.resume.additionalSections.projects);

  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    setExpandedIndex(null); // Collapse all sections when the form is loaded or refreshed
  }, []);

  const handleDateChange = (value, field, index) => {
    const updatedProject = {
      ...projects[index],
      [field]: value,
      currentlyWorking: value === 'Present',
    };
    dispatch(updateProject({ index, ...updatedProject }));
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProject = { ...projects[index], [name]: value };
    dispatch(updateProject({ index, ...updatedProject }));
  };

  const handleDeleteProject = (index) => {
    dispatch(removeProject(index));
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const handleAddMoreClick = () => {
    dispatch(addProject({
      projectName: '',
      startDate: '',
      endDate: '',
      projectDescription: '',
      currentlyWorking: false,
    }));
    setExpandedIndex(projects.length);
  };

  const toggleExpandCollapse = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="projects-form">
      <h2 className="text-2xl font-semibold mb-4">Projects</h2>

      {projects.map((project, index) => (
        <div key={index} className="border rounded-lg mb-4 shadow-sm">
          <div
            className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
            onClick={() => toggleExpandCollapse(index)}
          >
            <div>
              <strong className="text-lg">{project.projectName || "Untitled Project"}</strong>
            </div>
            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProject(index);
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
                  <label htmlFor="projectName" className="block text-sm font-medium text-gray-700">Project Name</label>
                  <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={project.projectName}
                    placeholder="Enter your project name"
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <DateRangeInput
                  startDate={project.startDate}
                  endDate={project.endDate}
                  currentlyWorking={project.currentlyWorking}
                  onDateChange={(value, field) => handleDateChange(value, field, index)}
                />
                <div className="mb-4">
                  <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700">Project Description</label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={project.projectDescription}
                    placeholder="Describe the project and your role"
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

export default ProjectsForm;
