import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    toast.warning('You must be logged in to view this page.');
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
