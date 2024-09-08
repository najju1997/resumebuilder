import axios from 'axios';

const API_URL = 'http://localhost:5000/api/resume'; // very important // Adjust the base URL according to your backend setup

// Function to create an empty resume and return the resume ID
export const createEmptyResume = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.post(`${API_URL}/create-empty`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Return the newly created resume ID
  return response.data.resumeId;
};

// Fetch all resumes for the logged-in user
export const getResumes = async (token) => {
  const response = await axios.get(`${API_URL}/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Map resumes to include titleName from personalDetails firstName
  const resumesWithTitles = response.data.map((resume) => {
    const titleName = resume.personalDetails.firstName || 'Untitled';
    return { ...resume, titleName };
  });

  return { data: resumesWithTitles };
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

// Fetch a specific resume by ID (for editing purposes)
export const getResumeById = async (resumeId, token) => {
  try {
    const response = await axios.get(`${API_URL}/getresumebyid/${resumeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Return the fetched resume data
  } catch (error) {
    console.error('Error fetching resume:', error.response?.data || error.message);
    throw error;
  }
};

// Update a specific resume by ID (for editing purposes)
export const updateResume = async (resumeId, resumeData, token) => {
  try {
    console.log('Sending update request for resume ID:', resumeId); // Log the ID being sent
    const response = await axios.put(`${API_URL}/update/${resumeId}`, resumeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating resume:', error.response?.data || error.message);
    throw error;
  }
};
