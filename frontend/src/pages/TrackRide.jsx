import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LiveMap from '../components/LiveMap';

const TrackRide = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800">Track My Ride</h1>
          <p className="text-slate-500 mt-2 text-sm">See your real-time location on the map while you're on the move.</p>
        </div>

        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-navy-900 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {user?.name?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <p className="font-bold text-slate-800">{user?.name || 'Student'}</p>
            <p className="text-sm text-slate-500 flex items-center gap-1.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              Live tracking active
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 sm:p-6">
          <LiveMap />
        </div>

        {/* Tips */}
        <div className="mt-6 bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
          <p className="font-semibold mb-1">💡 Tips for accurate tracking:</p>
          <ul className="list-disc list-inside space-y-1 text-amber-700">
            <li>Make sure GPS / Location Services are enabled on your device.</li>
            <li>For best accuracy, use your phone's browser while on the move.</li>
            <li>The map updates automatically as you move — no need to refresh!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TrackRide;
