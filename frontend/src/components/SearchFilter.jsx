import { useState } from 'react';

const SearchFilter = ({ onSearch }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(pickup, dropoff);
  };

  return (
    <form className="bg-white p-4 sm:p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 -mt-8 relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row gap-4" onSubmit={handleSearch}>
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </div>
        <input 
          type="text" 
          placeholder="Leaving from (e.g., KKV Hall)" 
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none text-slate-700 placeholder-slate-400"
        />
      </div>
      
      <div className="flex-1 relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        </div>
        <input 
          type="text" 
          placeholder="Going to (e.g., MU Hostel)" 
          value={dropoff}
          onChange={(e) => setDropoff(e.target.value)}
          className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none text-slate-700 placeholder-slate-400"
        />
      </div>

      <button type="submit" className="md:w-auto w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2">
        <span>Search</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </button>
    </form>
  );
};

export default SearchFilter;