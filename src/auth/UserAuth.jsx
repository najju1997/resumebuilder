import { Navigate } from 'react-router-dom';

const UserAuth = ({ children }) => {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/login" />;
};

export default UserAuth;
