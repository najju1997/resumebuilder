import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumes, removeResume, updateResumeName } from '../redux/slices/resumeListSlice';
import { useNavigate } from 'react-router-dom';

const ManageResumes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resumes, loading, error } = useSelector((state) => state.resumeList);
  const token = localStorage.getItem('token');
  const [editNameId, setEditNameId] = useState(null);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    if (token) {
      dispatch(fetchResumes(token));
    }
  }, [dispatch, token]);

  const handleDelete = (id) => {
    dispatch(removeResume({ id, token }));
  };

  const handleRename = (id) => {
    if (newName.trim()) {
      dispatch(updateResumeName({ id, name: newName, token }));
      setEditNameId(null);
      setNewName('');
    }
  };

  const handleStartNew = () => {
    // Redirect to the resume builder with a new resume
    navigate('/resume-builder');
  };

  return (
    <div className="manage-resumes">
      <h1 className="text-3xl font-bold mb-6">Manage Your Resumes</h1>
      {loading && <p>Loading resumes...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && resumes.length === 0 && <p>No resumes found. Start a new one!</p>}

      <button onClick={handleStartNew} className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4">
        Start New Resume
      </button>

      <div className="resumes-list">
        {resumes.map((resume) => (
          <div key={resume._id} className="resume-item border p-4 mb-4 rounded-md">
            {editNameId === resume._id ? (
              <div className="flex">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="border rounded-md p-2 flex-grow"
                />
                <button onClick={() => handleRename(resume._id)} className="bg-green-500 text-white py-2 px-4 rounded-md ml-2">
                  Save
                </button>
                <button onClick={() => setEditNameId(null)} className="bg-gray-500 text-white py-2 px-4 rounded-md ml-2">
                  Cancel
                </button>
              </div>
            ) : (
              <div className="flex justify-between">
                <h2 className="text-xl font-semibold">{resume.name}</h2>
                <div>
                  <button onClick={() => setEditNameId(resume._id)} className="bg-yellow-500 text-white py-2 px-4 rounded-md mr-2">
                    Rename
                  </button>
                  <button onClick={() => handleDelete(resume._id)} className="bg-red-500 text-white py-2 px-4 rounded-md">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageResumes;
