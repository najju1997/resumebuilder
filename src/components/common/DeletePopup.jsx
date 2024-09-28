const DeletePopup = ({ onConfirm }) => {
  const handleYesClick = () => onConfirm('yes');
  const handleNoClick = () => onConfirm('no');

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl mb-4">Are you sure you want to delete?</h3>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleNoClick}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            No
          </button>
          <button
            onClick={handleYesClick}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
