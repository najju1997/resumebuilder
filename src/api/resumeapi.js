import axios from 'axios';

const API_URL = 'http://localhost:5000/api/resume'; // Adjust the base URL according to your backend setup

// Fetch all resumes for the logged-in user
export const getResumes = async (token) => {
  const response = await axios.get(`${API_URL}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Delete a specific resume by ID
export const deleteResume = async (id, token) => {
  const response = await axios.delete(`${API_URL}/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Rename a specific resume by ID
export const renameResume = async (id, name, token) => {
  const response = await axios.put(
    `${API_URL}/rename/${id}`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

// Save a resume to the backend (existing function for reference)
export const saveResume = async (resumeData, token) => {
  const response = await axios.post(`${API_URL}/save`, resumeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};
