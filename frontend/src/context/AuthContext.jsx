import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const gender = localStorage.getItem('gender');
    const userId = localStorage.getItem('userId');
    if (token) {
      return { token, name: userName, gender, id: userId };
    }
    return null;
  });
  const navigate = useNavigate();

  const login = (token, userName, gender, userId) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    if (gender) localStorage.setItem('gender', gender);
    if (userId) localStorage.setItem('userId', userId);
    setUser({ token, name: userName, gender, id: userId });
    toast.success(`Welcome back, ${userName}!`);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('gender');
    localStorage.removeItem('userId');
    setUser(null);
    toast.info('You have been logged out.');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
