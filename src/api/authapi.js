// src/api/authapi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Adjust this if your backend is hosted elsewhere

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const googleLogin = async (tokenId) => {
  try {
    const response = await axios.post(`${API_URL}/google-login`, { tokenId });
    return response.data; // Returns token and user data
  } catch (error) {
    throw error.response.data;
  }
};