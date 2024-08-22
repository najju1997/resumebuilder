import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProject, removeProject } from '../../../redux/slices/resumeSlice';

const ProjectsForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.resume.additionalSections.projects);

  const [projectDetails, setProjectDetails] = useState({
    projectName: '',
    startDate: '',
    endDate: '',
    projectDescription: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails({
      ...projectDetails,
      [name]: value,
    });
  };

  const handleAddProject = () => {
    if (projectDetails.projectName) {
      dispatch(addProject({ ...projectDetails }));
      setProjectDetails({
        projectName: '',
        startDate: '',
        endDate: '',
        projectDescription: '',
      });
    }
  };

  const handleDeleteProject = (index) => {
    dispatch(removeProject(index));
  };

  return (
    <div className="projects-form">
      <h2>Projects</h2>
      <form>
        <div>
          <label htmlFor="projectName">Project Name</label>
          <input
            type="text"
            id="projectName"
            name="projectName"
            value={projectDetails.projectName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={projectDetails.startDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={projectDetails.endDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="projectDescription">Project Description</label>
          <textarea
            id="projectDescription"
            name="projectDescription"
            value={projectDetails.projectDescription}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleAddProject}>
          Add Project
        </button>
      </form>
      <div>
        <h3>Current Projects</h3>
        <ul>
          {projects.map((project, index) => (
            <li key={index}>
              {project.projectName} ({project.startDate} - {project.endDate})
              <button onClick={() => handleDeleteProject(index)}>Delete</button>
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

export default ProjectsForm;
