import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log('Token from localStorage:', storedToken); // Log the token for debugging
    setToken(storedToken);
  }, [[token]]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    console.log('Token removed, logging out...'); // Log for debugging when logging out
    setToken(null);
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          Resume Builder
        </Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-white">
            Home
          </Link>
          {token ? (
            <>
              <Link to="/resume-builder" className="text-white">
                Resume Builder
              </Link>
              <Link to="/manage-resumes" className="text-white">
                Manage Resumes
              </Link>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/signup" className="text-white">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
