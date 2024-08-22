
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Resume Builder</h1>
      <p className="mb-6 text-lg">
        Create a professional resume in minutes. Fill out your details, and we’ll help you
        generate a resume that stands out.
      </p>
      <Link to="/resume-builder">
        <button className="btn">Get Started</button>
      </Link>
    </div>
  );
};

export default Home;
