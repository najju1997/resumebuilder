import { useSelector, useDispatch } from 'react-redux';
import { addLanguage, updateLanguage, removeLanguage } from '../../../redux/slices/resumeSlice';
import { useState } from 'react';

const proficiencyOptions = ['Novice', 'Proficient', 'Highly Proficient', 'Native'];

const LanguageForm = () => {
  const dispatch = useDispatch();
  const languages = useSelector((state) => state.resume.languages);
  const [newLanguage, setNewLanguage] = useState('');
  const [newProficiency, setNewProficiency] = useState(proficiencyOptions[0]);

  const handleAddLanguage = () => {
    if (newLanguage.trim()) {
      dispatch(addLanguage({ language: newLanguage, proficiency: newProficiency }));
      setNewLanguage(''); // Clear the input
    }
  };

  const handleUpdateLanguage = (index, language, proficiency) => {
    dispatch(updateLanguage({ index, language, proficiency }));
  };

  const handleRemoveLanguage = (index) => {
    dispatch(removeLanguage(index));
  };

  return (
    <div className="language-form">
      <h2 className="text-2xl font-semibold mb-4">Languages</h2>
      
      {languages.map((lang, index) => (
        <div key={index} className="flex items-center mb-4">
          <input
            type="text"
            value={lang.language}
            onChange={(e) => handleUpdateLanguage(index, e.target.value, lang.proficiency)}
            className="mr-2 p-2 border border-gray-300 rounded-md"
          />
          <select
            value={lang.proficiency}
            onChange={(e) => handleUpdateLanguage(index, lang.language, e.target.value)}
            className="mr-2 p-2 border border-gray-300 rounded-md"
          >
            {proficiencyOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <button
            onClick={() => handleRemoveLanguage(index)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newLanguage}
          onChange={(e) => setNewLanguage(e.target.value)}
          placeholder="Enter new language"
          className="mr-2 p-2 border border-gray-300 rounded-md"
        />
        <select
          value={newProficiency}
          onChange={(e) => setNewProficiency(e.target.value)}
          className="mr-2 p-2 border border-gray-300 rounded-md"
        >
          {proficiencyOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <button
          onClick={handleAddLanguage}
          className="bg-green-500 text-white py-2 px-4 rounded-md"
        >
          Add Language
        </button>
      </div>
    </div>
  );
};

export default LanguageForm;
