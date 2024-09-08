import { useSelector, useDispatch } from 'react-redux';
import { setPersonalDetails } from '../../redux/slices/resumeSlice';

const PersonalDetailsForm = ({ onNext, onPrevious }) => {
  const dispatch = useDispatch();

  // Select personal details from the Redux store
  const personalDetails = useSelector((state) => state.resume.personalDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setPersonalDetails({
      ...personalDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    dispatch(setPersonalDetails({
      ...personalDetails,
      profilePhoto: file,
    }));
  };

  return (
    <div className="personal-details-form">
      <h2 className="text-2xl font-semibold mb-4">Personal Details</h2>
      <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={personalDetails.firstName}
              onChange={handleChange}
              placeholder="Enter your first name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={personalDetails.lastName}
              onChange={handleChange}
              placeholder="Enter your last name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="profilePhoto" className="block text-sm font-medium text-gray-700">Profile Photo</label>
            <input
              type="file"
              id="profilePhoto"
              name="profilePhoto"
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          {onPrevious && <button onClick={onPrevious} className="bg-gray-500 text-white py-2 px-4 rounded-md">Previous</button>}
          {onNext && <button onClick={onNext} className="bg-blue-500 text-white py-2 px-4 rounded-md">Next</button>}
        </div>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;



