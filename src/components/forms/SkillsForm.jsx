import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addSkill, updateSkill, removeSkill } from '../../redux/slices/resumeSlice';
import { getAISkillsSuggestions } from '../../api/resumeapi'; // API call to get AI suggestions
import { useParams } from 'react-router-dom';
import { FaMagic, FaSyncAlt, FaSpinner } from 'react-icons/fa'; // Importing icons

const SkillsForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const skills = useSelector((state) => state.resume.skills);
  const { resumeId } = useParams(); // Assuming resumeId is stored in Redux
  const token = localStorage.getItem('token');
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [suggestedSkills, setSuggestedSkills] = useState([]); // Initialize as empty array
  const [loadingSuggestions, setLoadingSuggestions] = useState(false); // For loading state
  const [error, setError] = useState(''); // Error handling

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
      skill: ''
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

  // Function to handle AI skill suggestions
  const handleRefreshSuggestions = async () => {
    setLoadingSuggestions(true);
    setError(''); // Clear any previous errors
    try {
      const aiSkills = await getAISkillsSuggestions(resumeId, token);
      console.log(aiSkills)
      if (Array.isArray(aiSkills)) {
        setSuggestedSkills(aiSkills); // Ensure the result is an array
        console.log(aiSkills)
      } else {
        setError('Invalid response format from AI.'); // Handle non-array responses
        setSuggestedSkills([]); // Reset the suggestions in case of error
      }
    } catch (error) {
      console.error('Error fetching AI skills suggestions:', error);
      setError('Failed to fetch AI skills suggestions.');
    } finally {
      setLoadingSuggestions(false);
    }
  };

  // Add suggested skill to the list
  const handleAddSuggestedSkill = (skill) => {
    if (!skills.some(s => s.skill === skill)) { // Avoid duplicates
      dispatch(addSkill({ skill }));
    }
  };

  return (
    <div className="skills-form">
      <h2 className="text-2xl font-semibold mb-4">Skills</h2>

{/* Suggested and Refresh Buttons */}
<div className="flex items-center space-x-2 mb-4">
  {!suggestedSkills.length > 0 ? (
    <button
      className="bg-purple-500 text-white py-2 px-4 rounded-md flex items-center"
      onClick={handleRefreshSuggestions}
      disabled={loadingSuggestions}
    >
      {loadingSuggestions ? (
        <FaSpinner className="animate-spin mr-2" />  // Loading spinner for AI Magic
      ) : (
        <FaMagic className="mr-2" />  // Magic wand icon for AI Magic
      )}
      AI Magic
    </button>
  ) : (
    <button
      className="bg-blue-500 text-white py-2 px-4 rounded-md flex items-center"
      onClick={handleRefreshSuggestions}
      disabled={loadingSuggestions}
    >
      {loadingSuggestions ? (
        <FaSpinner className="animate-spin mr-2" />  // Loading spinner for Refresh
      ) : (
        <FaSyncAlt className="mr-2" />  // Refresh icon for Refresh
      )}
      Refresh
    </button>
  )}
  {loadingSuggestions}
</div>


      {/* Display AI Suggested Skills */}
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="flex flex-wrap gap-2 mb-4">
          {Array.isArray(suggestedSkills) && suggestedSkills.length > 0 ? (
            suggestedSkills.map((skill, index) => (
              <span
                key={index}
                onClick={() => handleAddSuggestedSkill(skill)}
                className="cursor-pointer px-3 py-1 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-300"
              >
                {skill}
              </span>
            ))
          ) : (
            <p>Use AI Magic to generate skills.</p>
          )}
        </div>
      )}

      {/* User Selected Skills */}
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
              </form>
            </div>
          )}
        </div>
      ))}

      <button onClick={handleAddSkill} className="bg-green-500 text-white py-2 px-4 rounded-md mt-4">
        Add Skill
      </button>

      <div className="flex justify-between mt-4">
        <button onClick={onPrevious} className="bg-gray-500 text-white py-2 px-4 rounded-md">Previous</button>
        {onNext && <button onClick={onNext} className="bg-blue-500 text-white py-2 px-4 rounded-md">Next</button>}
      </div>
    </div>
  );
};

export default SkillsForm;
