import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Base URL for the API

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log('Token expired, redirecting to login...');
        localStorage.removeItem('token'); // Clear the token
  
        // Instead of using useNavigate, use window.location to redirect:
        window.location.href = '/login'; // Redirect to login page
      }
      return Promise.reject(error);
    }
  );
  

export default api;
