import api from "./axios";

// Function to create an empty resume and return the resume ID
export const createEmptyResume = async () => {
  const token = localStorage.getItem('token');
  const response = await api.post(`/resume/create-empty`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.resumeId; // Return the newly created resume ID
};

// Fetch all resumes for the logged-in user
export const getResumes = async (token) => {
  const response = await api.get('/resume/all', {
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
  const response = await api.delete(`/resume/delete/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Rename a specific resume by ID
export const renameResume = async (id, newName, token) => {
  console.log('renameResume called with resumeId:', id, newName);
  const response = await api.put(
    `/resume/rename/${id}`,
    { newName }, // Send the new resume name
    {
      headers: {
        Authorization: `Bearer ${token}`, // Adding Bearer token for authentication
      },
    }
  );
  return response;
};

// Save a resume to the backend (existing function for reference)
export const saveResume = async (resumeData, token) => {
  const response = await api.post(`/resume/save`, resumeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

// Fetch a specific resume by ID (for editing purposes)
export const getResumeById = async (resumeId, token) => {
  
  try {
    const response = await api.get(`/resume/getresumebyid/${resumeId}`, {
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
    console.log('Sending update request for resume ID:', resumeId);
    const response = await api.put(`/resume/update/${resumeId}`, resumeData, {
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

// AI suggestions for experience points
export const getAISuggestions = async (resumeId, jobIndex, token) => {
  try {
    console.log('AI resume ID:', resumeId, jobIndex);
    console.log('token muji', token) 
    const response = await api.post(`/resume/ai/suggest/${resumeId}/${jobIndex}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.aiSuggestions;  // Return the AI-generated suggestions
  } catch (error) {
    console.error('Error fetching AI suggestions:', error);
    throw error;
  }
};

// Function to fetch AI-generated professional summary
export const generateAISummary = async (resumeId, token) => {
  try {
    console.log('AI summary resume ID:', resumeId);
    const response = await api.post(`/resume/ai/professional-summary/${resumeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.professionalSummary;  // Return the AI-generated professional summary
  } catch (error) {
    console.error('Error generating professional summary:', error);
    throw error;
  }
};

export const getAISkillsSuggestions = async (resumeId, token) => {
  try {
    console.log('AI skills front end API resume ID:', resumeId);
    const response = await api.post(`/resume/ai/suggest-skills/${resumeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.suggestedSkills; // Return the suggested skills from the response
  } catch (error) {
    console.error('Error fetching AI skills suggestions:', error);
    throw error;
  }
};
