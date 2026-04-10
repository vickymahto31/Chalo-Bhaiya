import { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 
  const location = useLocation();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault(); 
    
    if (email.trim() !== '' && password.trim() !== '') {
      try {
        setLoading(true);
        const response = await api.post('/api/auth/login', { email, password });
        login(response.data.token, response.data.user.name, response.data.user.gender, response.data.user.id);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          toast.error("Looks like you don't have an account yet. Please sign up first!");
          navigate('/signup');
        } else {
          toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning("Please enter both your Email and Password.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-navy-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10 relative z-10">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800">Welcome back</h2>
          <p className="text-slate-500 mt-2 text-sm">Please enter your details to sign in.</p>
        </div>
        
        {location.state?.message && (
          <div className="bg-amber-50 border-l-4 border-brand-500 p-4 mb-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-brand-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-amber-800">{location.state.message}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Email address</label>
              <input 
                type="email" 
                placeholder="student@marwadiuniversity.ac.in" 
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-slate-400" 
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-slate-400" 
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 bg-navy-800 hover:bg-navy-900 text-white shadow-md rounded-xl font-bold text-lg active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-navy-900 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-slate-600">
          Not registered yet?{' '}
          <Link to="/signup" className="text-brand-500 hover:text-brand-600 font-bold transition-colors">
            Create an account
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Login;