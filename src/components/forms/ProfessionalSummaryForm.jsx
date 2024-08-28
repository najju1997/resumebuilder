import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProfessionalSummary } from '../../redux/slices/resumeSlice';

const ProfessionalSummaryForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const professionalSummary = useSelector((state) => state.resume.professionalSummary);

  const handleChange = (e) => {
    dispatch(setProfessionalSummary(e.target.value));
  };

  return (
    <div className="professional-summary-form">
      <h2 className="text-2xl font-semibold mb-4">Professional Summary</h2>
      <textarea
        className="w-full h-32 p-2 border border-gray-300 rounded"
        value={professionalSummary}
        onChange={handleChange}
        placeholder="Summarize your professional experience and skills..."
      />
      <div className="flex justify-between mt-4">
            <button onClick={onPrevious} className="bg-gray-500 text-white py-2 px-4 rounded-md">Previous</button>
            {onNext && <button onClick={onNext} className="bg-blue-500 text-white py-2 px-4 rounded-md">Next</button>}
      </div>
    </div>
  );
};

export default ProfessionalSummaryForm;
