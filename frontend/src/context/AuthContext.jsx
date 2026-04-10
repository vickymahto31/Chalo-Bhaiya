import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const gender = localStorage.getItem('gender');
    if (token) {
      return { token, name: userName, gender };
    }
    return null;
  });
  const navigate = useNavigate();

  const login = (token, userName, gender) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userName', userName);
    if (gender) localStorage.setItem('gender', gender);
    setUser({ token, name: userName, gender });
    toast.success(`Welcome back, ${userName}!`);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('gender');
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
