import { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-3 active:scale-95 transition-transform">
              <div className="bg-brand-500 p-1.5 rounded-lg shadow-sm">
                <img src="https://static.thenounproject.com/png/6936464-84.png" alt="logo" className="h-8 w-8 invert brightness-0" />
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">
                Chalo<span className="text-brand-500">Bhaiya</span>
              </span>
            </Link>
          </div>

          {/* Links & Auth */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/find-ride" 
              className={`text-sm font-medium transition-colors hover:text-brand-500 ${isActive('/find-ride') ? 'text-brand-500' : 'text-slate-600'}`}
            >
              Find a Ride
            </Link>
            <Link 
              to="/offer-ride" 
              className={`text-sm font-medium transition-colors hover:text-brand-500 ${isActive('/offer-ride') ? 'text-brand-500' : 'text-slate-600'}`}
            >
              Offer a Ride
            </Link>
            <Link 
              to="/track-ride" 
              className={`text-sm font-medium transition-colors hover:text-brand-500 ${isActive('/track-ride') ? 'text-brand-500' : 'text-slate-600'}`}
            >
              Track Ride
            </Link>

            {/* Separator */}
            <div className="h-6 w-px bg-slate-200"></div>

            {user ? (
              <div className="flex items-center gap-4">
                <Link to="/inbox" className="text-slate-500 hover:text-brand-500 transition-colors p-2 bg-slate-50 rounded-full border border-slate-200">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                </Link>
                <Link to="/profile" className="flex items-center gap-2 group p-1 pr-3 bg-slate-50 hover:bg-slate-100 rounded-full border border-slate-200 transition-colors">
                  <img src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png" alt="profile" className="h-8 w-8 rounded-full shadow-sm" />
                  <span className="text-sm font-semibold text-slate-700 group-hover:text-brand-600 transition-colors">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link 
                  to="/login" 
                  className="text-sm font-semibold text-slate-600 hover:text-brand-500 transition-colors"
                >
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  className="text-sm font-semibold bg-brand-500 text-white px-5 py-2 rounded-full shadow-md hover:bg-brand-600 hover:shadow-lg active:scale-95 transition-all"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center mr-2">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-slate-700 bg-slate-100 border border-slate-300 rounded-md shadow-sm hover:text-brand-500 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 p-2"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 pt-2 pb-4 space-y-3 shadow-lg">
          <Link 
            to="/find-ride" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block text-base font-medium p-2 rounded-md transition-colors ${isActive('/find-ride') ? 'text-brand-500 bg-brand-50' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Find a Ride
          </Link>
          <Link 
            to="/offer-ride" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block text-base font-medium p-2 rounded-md transition-colors ${isActive('/offer-ride') ? 'text-brand-500 bg-brand-50' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Offer a Ride
          </Link>
          <Link 
            to="/track-ride" 
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block text-base font-medium p-2 rounded-md transition-colors ${isActive('/track-ride') ? 'text-brand-500 bg-brand-50' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            Track Ride
          </Link>

          <div className="h-px w-full bg-slate-200 my-2"></div>

          {user ? (
            <div className="flex flex-col space-y-1">
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 group rounded-md hover:bg-slate-50 transition-colors">
                <img src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png" alt="profile" className="h-8 w-8 rounded-full shadow-sm" />
                <span className="text-base font-medium text-slate-700 group-hover:text-brand-600 transition-colors">{user.name}</span>
              </Link>
              <Link to="/inbox" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 p-2 rounded-md hover:bg-slate-50 text-slate-600 hover:text-brand-500 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                <span className="text-base font-medium">Messages</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left p-2 rounded-md text-base font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3 pt-2">
              <Link 
                to="/login" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center text-base font-semibold text-slate-600 hover:text-brand-500 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Log in
              </Link>
              <Link 
                to="/signup" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-center text-base font-semibold bg-brand-500 text-white py-2.5 rounded-lg shadow-sm hover:bg-brand-600 active:scale-95 transition-all"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;