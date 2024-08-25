import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReference, removeReference } from '../../../redux/slices/resumeSlice';

const ReferencesForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();
  const references = useSelector((state) => state.resume.additionalSections.references);

  const [referenceDetails, setReferenceDetails] = useState({
    referentName: '',
    referentCompany: '',
    referentEmail: '',
    referentPhone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReferenceDetails({
      ...referenceDetails,
      [name]: value,
    });
  };

  const handleAddReference = () => {
    if (referenceDetails.referentName && referenceDetails.referentCompany) {
      dispatch(addReference({ ...referenceDetails }));
      setReferenceDetails({
        referentName: '',
        referentCompany: '',
        referentEmail: '',
        referentPhone: '',
      });
    }
  };

  const handleDeleteReference = (index) => {
    dispatch(removeReference(index));
  };

  return (
    <div className="references-form">
      <h2>References</h2>
      <form>
        <div>
          <label htmlFor="referentName">Referent Name</label>
          <input
            type="text"
            id="referentName"
            name="referentName"
            value={referenceDetails.referentName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="referentCompany">Referent Company</label>
          <input
            type="text"
            id="referentCompany"
            name="referentCompany"
            value={referenceDetails.referentCompany}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="referentEmail">Referent Email</label>
          <input
            type="email"
            id="referentEmail"
            name="referentEmail"
            value={referenceDetails.referentEmail}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="referentPhone">Referent Phone</label>
          <input
            type="text"
            id="referentPhone"
            name="referentPhone"
            value={referenceDetails.referentPhone}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleAddReference}>
          Add Reference
        </button>
      </form>
      <div>
        <h3>Current References</h3>
        <ul>
          {references.map((reference, index) => (
            <li key={index}>
              {reference.referentName} from {reference.referentCompany}
              <button onClick={() => handleDeleteReference(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between mt-6">
        <button onClick={onPrevious} className="bg-gray-500 text-white py-2 px-4 rounded-md">Previous</button>
        {onNext && <button onClick={onNext} className="bg-blue-500 text-white py-2 px-4 rounded-md">Next</button>}
      </div>
    </div>
  );
};

export default ReferencesForm;
