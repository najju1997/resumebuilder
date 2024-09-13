import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { setUser } from '../redux/slices/uiSlice'; // Assuming you're using Redux to store user state
import { resetResume } from '../redux/slices/resumeSlice'; // Assuming you want to reset resumes upon login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Email/password login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, { email, password });
      const { token, user } = data;

      // Store JWT token in localStorage
      localStorage.setItem('token', token);

      // Dispatch user data to Redux and reset resume state
      dispatch(resetResume());
      dispatch(setUser(user));

      // Redirect to manage resumes page
      navigate('/manage-resumes');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  // Google login success handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      // Send Google OAuth token to backend for verification
      const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/google-login`, {
        tokenId: credentialResponse.credential,
      });

      // Extract token and user from backend response
      const { token, user } = data;

      // Store JWT token in localStorage
      localStorage.setItem('token', token);

      // Dispatch user data to Redux and reset resume state
      dispatch(resetResume());
      dispatch(setUser(user));

      // Redirect to manage resumes page
      navigate('/manage-resumes');
    } catch (err) {
      setError('Google login failed');
    }
  };

  // Google login failure handler
  const handleGoogleFailure = (error) => {
    console.error('Google login failed:', error);
    setError('Google login failed');
  };

  return (
    <div className="login-form">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      
      {/* Display any login errors */}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Email/password login form */}
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">Login</button>
      </form>

      <hr className="my-4" />

      {/* Google OAuth login button */}
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          ux_mode="popup"  // Ensure correct popup mode
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Login;
