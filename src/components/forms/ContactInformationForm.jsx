import { useSelector, useDispatch } from 'react-redux';
import { setContactInformation } from '../../redux/slices/resumeSlice';

const ContactInformationForm = ({ onNext, onPrevious }) => {
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
      <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
      <form>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactInformation.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={contactInformation.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              value={contactInformation.country}
              onChange={handleChange}
              placeholder="Enter your country"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={contactInformation.city}
              onChange={handleChange}
              placeholder="Enter your city"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={contactInformation.address}
              onChange={handleChange}
              placeholder="Enter your address"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={contactInformation.postalCode}
              onChange={handleChange}
              placeholder="Enter your postal code"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <button onClick={onPrevious} className="bg-gray-500 text-white py-2 px-4 rounded-md">Previous</button>
          {onNext && <button onClick={onNext} className="bg-blue-500 text-white py-2 px-4 rounded-md">Next</button>}
        </div>
      </form>
    </div>
  );
};

export default ContactInformationForm;
