import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResumeBuilder from './pages/ResumeBuilder';
import Home from './pages/Home';

const App = () => {
  return (
    <Router>
      <div className="app-container flex">
        <div className="content-container flex-grow p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
