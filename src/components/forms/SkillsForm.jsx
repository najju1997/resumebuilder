import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSkill, removeSkill } from '../../redux/slices/resumeSlice';

const SkillsForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.skills);

  const [skillDetails, setSkillDetails] = useState({
    skill: '',
    level: 3, // Default to 3 out of 5
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSkillDetails({
      ...skillDetails,
      [name]: value,
    });
  };

  const handleAddSkill = () => {
    if (skillDetails.skill) {
      dispatch(addSkill({ ...skillDetails }));
      setSkillDetails({ skill: '', level: 3 });
    }
  };

  const handleDeleteSkill = (index) => {
    dispatch(removeSkill(index));
  };

  return (
    <div className="skills-form">
      <h2>Skills</h2>
      <form>
        <div>
          <label htmlFor="skill">Skill</label>
          <input
            type="text"
            id="skill"
            name="skill"
            value={skillDetails.skill}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="level">Level</label>
          <input
            type="range"
            id="level"
            name="level"
            min="1"
            max="5"
            value={skillDetails.level}
            onChange={handleChange}
          />
          <span>{skillDetails.level} out of 5</span>
        </div>
        <button type="button" onClick={handleAddSkill}>
          Add Skill
        </button>
      </form>
      <div>
        <h3>Current Skills</h3>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>
              {skill.skill} - {skill.level} out of 5
              <button onClick={() => handleDeleteSkill(index)}>Delete</button>
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

export default SkillsForm;
