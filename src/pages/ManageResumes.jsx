import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResumes, removeResume, updateResumeName } from '../redux/slices/resumeListSlice';
import { resetResume, setResumeId } from '../redux/slices/resumeSlice'; 
import { useNavigate } from 'react-router-dom';
import { createEmptyResume } from '../api/resumeapi'; 

const ManageResumes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resumes, loading, error } = useSelector((state) => state.resumeList);
  const token = localStorage.getItem('token');
  const [editNameId, setEditNameId] = useState(null);
  const [newName, setNewName] = useState('');

  // Fetch resumes when the component mounts
  useEffect(() => {
    if (token) {
      console.log("Token found, dispatching fetchResumes...");
      dispatch(fetchResumes(token)); // Fetch resumes from API using Redux
    } else {
      console.log("No token found.");
    }
  }, [dispatch, token]);

  // Log the resumes state to check if data is being fetched
  useEffect(() => {
    console.log("Resumes state:", resumes);
  }, [resumes]);

  // Handle deleting a resume
  const handleDelete = (id) => {
    console.log("Attempting to delete resume with ID:", id); 
    dispatch(removeResume({ id, token }));
  };

  // Handle renaming a resume
  // Handle renaming a resume
  const handleRename = (id) => {
    if (newName.trim()) {
      console.log('manageResume resumeid:', id, newName);
      // Dispatch the updateResumeName action with the correct resumeId
      dispatch(updateResumeName({ id, newName, token }));

      // Clear the editNameId and newName after renaming
      setEditNameId(null);
      setNewName('');
    }
  };
  
  

  // Handle starting a new resume
  const handleStartNew = async () => {
    try {
      const newResumeId = await createEmptyResume(); // Create a new empty resume
      dispatch(resetResume()); 
      dispatch(setResumeId(newResumeId)); 
      navigate(`/resume-builder/${newResumeId}`);
    } catch (error) {
      console.error('Error creating new resume:', error);
    }
  };

  // Handle editing a resume (redirect to the builder with the existing resumeId)
  const handleEditResume = (resumeId) => {
    dispatch(setResumeId(resumeId)); 
    navigate(`/resume-builder/${resumeId}`); 
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
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">
                {resume.resumeName || 'Untitled Resume'}
              </h2>

              <div>
                <button onClick={() => setEditNameId(resume._id)} className="bg-yellow-500 text-white py-2 px-4 rounded-md mr-2">
                  Rename
                </button>
                <button onClick={() => handleEditResume(resume._id)} className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2">
                  Edit
                </button>
                <button onClick={() => handleDelete(resume._id)} className="bg-red-500 text-white py-2 px-4 rounded-md">
                  Delete
                </button>
              </div>
            </div>

            {editNameId === resume._id && (
              <div className="flex mt-4">
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageResumes;
