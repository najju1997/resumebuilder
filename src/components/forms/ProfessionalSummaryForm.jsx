import { useSelector, useDispatch } from 'react-redux';
import { setProfessionalSummary } from '../../redux/slices/resumeSlice';
import { useState } from 'react';
import { generateAISummary } from '../../api/resumeapi';
import { FaSpinner } from 'react-icons/fa'; // Import spinner icon

const ProfessionalSummaryForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const professionalSummary = useSelector((state) => state.resume.professionalSummary);
  const employmentHistory = useSelector((state) => state.resume.employmentHistory);
  const resumeId = useSelector((state) => state.resume.resumeId);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    dispatch(setProfessionalSummary(e.target.value));
  };

  // Validation for AI Magic Button
  const isValidForAIMagic = employmentHistory.length > 0 &&
    employmentHistory[0].jobTitle &&
    employmentHistory[0].jobField &&
    employmentHistory[0].experiencePoints.length > 0;

  // AI Magic Click Handler
  const handleAIMagicClick = async () => {
    if (!isValidForAIMagic) {
      return;
    }
    setLoading(true);
    setError(''); // Clear any previous errors
    try {
      const aiSummary = await generateAISummary(resumeId);
      dispatch(setProfessionalSummary(aiSummary));  // Update Redux with the AI summary
    } catch (err) {
      setError('AI generation failed.');
      console.error('Error generating AI summary:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="professional-summary-form">
      <h2 className="text-2xl font-semibold mb-4">Professional Summary</h2>
      
      {/* Text area to display or edit the AI-generated summary */}
      <textarea
        className="w-full h-32 p-2 border border-gray-300 rounded"
        value={professionalSummary}
        onChange={handleChange}
        placeholder="Summarize your professional experience and skills..."
      />
      
      {/* AI Magic Button with Spinner */}
      <button
        onClick={handleAIMagicClick}
        className={`bg-purple-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-purple-600 transition duration-300 flex items-center justify-center ${!isValidForAIMagic ? 'opacity-50 cursor-not-allowed' : ''}`}
        // disabled={!isValidForAIMagic || loading}  // Disable if not valid or loading
      >
        {loading ? (
          <FaSpinner className="animate-spin mr-2" /> // Spinner for loading
        ) : (
          'AI Magic'
        )}
      </button>

      {/* Display validation message if requirements are not met */}
      {!isValidForAIMagic && (
        <p className="text-sm text-red-500 mt-2">
          Ops! Fill one Employment Experience.
        </p>
      )}

      {/* Display error message if validation fails */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="flex justify-between mt-4">
        <button onClick={onPrevious} className="bg-gray-500 text-white py-2 px-4 rounded-md">
          Previous
        </button>
        {onNext && (
          <button onClick={onNext} className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
