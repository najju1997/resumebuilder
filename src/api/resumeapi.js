// src/api/resumeapi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/resume'; // Adjust this if your backend is hosted elsewhere

export const saveResume = async (resumeData, token) => {
  try {
    const response = await axios.post(`${API_URL}/save`, resumeData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getResume = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
