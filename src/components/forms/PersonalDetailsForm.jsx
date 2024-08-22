
import { useSelector, useDispatch } from 'react-redux';
import { setPersonalDetails } from '../../redux/slices/resumeSlice';

const PersonalDetailsForm = ({onNext}) => {
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

  return (
    <div className="personal-details-form">
      <h2>Personal Details</h2>
      <form>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={personalDetails.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={personalDetails.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="profilePhoto">Profile Photo</label>
          <input
            type="file"
            id="profilePhoto"
            name="profilePhoto"
            onChange={(e) => {
              const file = e.target.files[0];
              dispatch(setPersonalDetails({
                ...personalDetails,
                profilePhoto: file,
              }));
            }}
          />
        </div>
        <button onClick={onNext} className="btn btn-primary mt-4">Next</button>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;
