// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResumeBuilder from './pages/ResumeBuilder';
import Home from './pages/Home';
import Login from './auth/Login'
import Signup from './auth/Signup';
import UserAuth from './auth/userAuth';
import Navbar from './components/common/Navbar';
import ManageResumes from './pages/ManageResumes';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/manage-resumes" element={
            <UserAuth>
              <ManageResumes />
            </UserAuth>
          }
        />
        <Route path="/resume-builder" element={
            <UserAuth>
              <ResumeBuilder />
            </UserAuth>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
