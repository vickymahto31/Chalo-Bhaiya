import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../api';
import { toast } from 'react-toastify';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (location.state && location.state.message) {
      toast.info(location.state.message);
    }
  }, [location]);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (name && email && password && gender) {
      if (!email.toLowerCase().endsWith('@marwadiuniversity.ac.in')) {
        toast.error("Please use your @marwadiuniversity.ac.in student email.");
        return;
      }

      try {
        setLoading(true);
        await api.post('/api/auth/register', { name, email, password, studentId, gender });
        toast.success("Account created successfully! You can now log in.");
        navigate('/login');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Signup failed.');
      } finally {
        setLoading(false);
      }
    } else {
      toast.warning("Please fill in all required fields.");
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Decorative blobs */}
      <div className="absolute top-[10%] left-[-5%] w-96 h-96 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-[10%] right-[-5%] w-96 h-96 bg-navy-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 p-8 sm:p-10 relative z-10">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
             <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800">Create Account</h2>
          <p className="text-slate-500 mt-2 text-sm">Join the community of student commuters.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
            <input 
              type="text" 
              placeholder="e.g., Rahul Patel" 
              value={name} onChange={(e) => setName(e.target.value)}
              className="w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-slate-400" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
            <input 
              type="email" 
              placeholder="student@marwadiuniversity.ac.in" 
              value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-slate-400" 
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">
              Student ID <span className="text-slate-400 font-normal ml-1">(Optional)</span>
            </label>
            <input 
              type="text" 
              placeholder="e.g., MU12345" 
              value={studentId} onChange={(e) => setStudentId(e.target.value)}
              className="w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-slate-400"
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

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full py-2.5 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
              required
            >
              <option value="" disabled>Select your gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 mt-8 bg-brand-500 hover:bg-brand-600 text-white shadow-md rounded-xl font-bold text-lg active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>
        
        <div className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-500 hover:text-brand-600 font-bold transition-colors">
            Log in here
          </Link>
        </div>
        
      </div>
    </div>
  );
};

export default Signup;