
import { useSelector, useDispatch } from 'react-redux';
import { setContactInformation } from '../../redux/slices/resumeSlice';

const ContactInformationForm = ( { onNext, onPrevious } ) => {
  const dispatch = useDispatch();

  // Select contact information from the Redux store
  const contactInformation = useSelector((state) => state.resume.contactInformation);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setContactInformation({
      ...contactInformation,
      [name]: value,
    }));
  };

  return (
    <div className="contact-information-form">
      <h2>Contact Information</h2>
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactInformation.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={contactInformation.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={contactInformation.country}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={contactInformation.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={contactInformation.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            value={contactInformation.postalCode}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between mt-4">
          <button onClick={onPrevious} className="btn btn-secondary">Previous</button>
          <button onClick={onNext} className="btn btn-primary">Next</button>
        </div>
      </form>
    </div>
  );
};

export default ContactInformationForm;
