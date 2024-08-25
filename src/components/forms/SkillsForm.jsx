import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSkill, updateSkill, removeSkill } from '../../redux/slices/resumeSlice';

const SkillsForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.skills);

  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    setExpandedIndex(null);
  }, []);

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSkill = { ...skills[index], [name]: value };
    dispatch(updateSkill({ index, ...updatedSkill }));
  };

  const handleAddSkill = () => {
    dispatch(addSkill({
      skill: '',
      level: 3, // Default level
    }));
    setExpandedIndex(skills.length);
  };

  const handleDeleteSkill = (index) => {
    dispatch(removeSkill(index));
    if (expandedIndex === index) {
      setExpandedIndex(null);
    }
  };

  const toggleExpandCollapse = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="skills-form">
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>

      {skills.map((skill, index) => (
        <div key={index} className="border rounded-lg mb-4 shadow-sm">
          <div
            className="flex justify-between items-center p-4 bg-gray-100 cursor-pointer"
            onClick={() => toggleExpandCollapse(index)}
          >
            <div>
              <strong className="text-lg">{skill.skill || "Untitled Skill"}</strong>
            </div>
            <div className="flex items-center">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteSkill(index);
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
                  <label htmlFor="skill" className="block text-sm font-medium text-gray-700">Skill</label>
                  <input
                    type="text"
                    id="skill"
                    name="skill"
                    value={skill.skill}
                    placeholder="Enter your skill"
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="level" className="block text-sm font-medium text-gray-700">Level</label>
                  <input
                    type="range"
                    id="level"
                    name="level"
                    min="1"
                    max="5"
                    value={skill.level}
                    onChange={(e) => handleChange(e, index)}
                    className="mt-1 block w-full"
                  />
                  <span>{skill.level} out of 5</span>
                </div>
              </form>
            </div>
          )}
        </div>
      ))}

      <button onClick={handleAddSkill} className="bg-green-500 text-white py-2 px-4 rounded-md mt-4">
        Add Record
      </button>

      <div className="flex justify-between mt-4">
        <button onClick={onPrevious} className="bg-gray-500 text-white py-2 px-4 rounded-md">Previous</button>
        {onNext && <button onClick={onNext} className="bg-blue-500 text-white py-2 px-4 rounded-md">Next</button>}
      </div>
    </div>
  );
};

export default SkillsForm;
