import { useSelector, useDispatch } from 'react-redux';
import { addHobby, updateHobby, removeHobby } from '../../../redux/slices/resumeSlice';
import { useState } from 'react';

const HobbyForm = () => {
  const dispatch = useDispatch();
  const hobbies = useSelector((state) => state.resume.hobbies);
  const [newHobby, setNewHobby] = useState('');

  const handleAddHobby = () => {
    if (newHobby.trim()) {
      dispatch(addHobby({ hobby: newHobby }));  // Dispatching as an object { hobby: newHobby }
      setNewHobby(''); // Clear the input
    }
  };

  const handleUpdateHobby = (index, hobby) => {
    dispatch(updateHobby({ index, hobby })); // Update the hobby
  };

  const handleRemoveHobby = (index) => {
    dispatch(removeHobby(index));
  };

  return (
    <div className="hobby-form">
      <h2 className="text-2xl font-semibold mb-4">Hobbies</h2>

      {hobbies.map((hobbyObj, index) => (
        <div key={index} className="flex items-center mb-4">
          <input
            type="text"
            value={hobbyObj.hobby} // Accessing the hobby field
            onChange={(e) => handleUpdateHobby(index, e.target.value)}
            className="mr-2 p-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => handleRemoveHobby(index)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="flex items-center mb-4">
        <input
          type="text"
          value={newHobby}
          onChange={(e) => setNewHobby(e.target.value)}
          placeholder="Enter new hobby"
          className="mr-2 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleAddHobby}
          className="bg-green-500 text-white py-2 px-4 rounded-md"
        >
          Add Hobby
        </button>
      </div>
    </div>
  );
};

export default HobbyForm;
