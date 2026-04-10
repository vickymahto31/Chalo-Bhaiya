import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import { toast } from 'react-toastify';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('details');

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    gender: '',
    dob: '',
    studentId: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [historyData, setHistoryData] = useState({ offeredRides: [], bookedRides: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfileData();
    fetchHistoryData();
  }, [user.token]);

  const fetchProfileData = async () => {
    try {
      const res = await api.get('/api/users/profile', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setProfileData({
        name: res.data.name || '',
        email: res.data.email || '',
        phoneNumber: res.data.phoneNumber || '',
        gender: res.data.gender || '',
        dob: res.data.dob ? res.data.dob.split('T')[0] : '', // format to YYYY-MM-DD
        studentId: res.data.studentId || ''
      });
    } catch (err) {
      toast.error('Failed to load profile details.');
    }
  };

  const fetchHistoryData = async () => {
    try {
      const res = await api.get('/api/users/history', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setHistoryData({
        offeredRides: res.data.offeredRides,
        bookedRides: res.data.bookedRides
      });
      setLoading(false);
    } catch (err) {
      toast.error('Failed to load ride history.');
      setLoading(false);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/api/users/profile', profileData, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      toast.error('Failed to update profile.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Header section */}
          <div className="bg-navy-900 px-8 py-10 text-white text-center sm:text-left flex flex-col sm:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-brand-500 rounded-full border-4 border-white/20 p-2 shadow-xl flex items-center justify-center">
              <img src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png" alt="profile" className="w-full h-full object-cover invert brightness-0" />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold">{profileData.name || 'User Profile'}</h2>
              <p className="text-navy-300 mt-1 flex items-center justify-center sm:justify-start gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {profileData.email}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 bg-slate-50/50">
            <button
              onClick={() => setActiveTab('details')}
              className={`flex-1 py-4 px-6 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'details' ? 'border-brand-500 text-brand-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
            >
              My Details
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-4 px-6 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'history' ? 'border-brand-500 text-brand-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
            >
              Ride History
            </button>
          </div>

          <div className="p-8">
            {/* My Details Tab */}
            {activeTab === 'details' && (
              <div className="animate-fade-in">
                {!isEditing ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Full Name</span>
                        <span className="text-slate-800 font-medium">{profileData.name}</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Student ID</span>
                        <span className="text-slate-800 font-medium">{profileData.studentId || 'Not provided'}</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Phone Number</span>
                        <span className="text-slate-800 font-medium">{profileData.phoneNumber || 'Not provided'}</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Gender</span>
                        <span className="text-slate-800 font-medium">{profileData.gender || 'Not provided'}</span>
                      </div>
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 sm:col-span-2">
                        <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Date of Birth</span>
                        <span className="text-slate-800 font-medium">{profileData.dob ? new Date(profileData.dob).toLocaleDateString() : 'Not provided'}</span>
                      </div>
                    </div>
                    
                    <div className="pt-4 flex justify-end">
                      <button
                        onClick={() => setIsEditing(true)}
                        className="bg-navy-800 hover:bg-navy-900 text-white font-semibold py-2.5 px-6 rounded-xl shadow-sm transition-all active:scale-95"
                      >
                        Edit Profile
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleProfileUpdate} className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
                        <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" required />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Student ID</label>
                        <input type="text" value={profileData.studentId} onChange={(e) => setProfileData({...profileData, studentId: e.target.value})} className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Phone Number</label>
                        <input type="tel" value={profileData.phoneNumber} onChange={(e) => setProfileData({...profileData, phoneNumber: e.target.value})} className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Gender</label>
                        <select value={profileData.gender} onChange={(e) => setProfileData({...profileData, gender: e.target.value})} className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all">
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Date of Birth</label>
                        <input type="date" value={profileData.dob} onChange={(e) => setProfileData({...profileData, dob: e.target.value})} className="w-full sm:w-1/2 py-2.5 px-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all" />
                      </div>
                    </div>

                    <div className="pt-4 flex gap-4 justify-end border-t border-slate-100">
                      <button type="button" onClick={() => setIsEditing(false)} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-6 rounded-xl transition-all">
                        Cancel
                      </button>
                      <button type="submit" className="bg-brand-500 hover:bg-brand-600 text-white font-semibold py-2.5 px-6 rounded-xl shadow-sm transition-all active:scale-95">
                        Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Ride History Tab */}
            {activeTab === 'history' && (
              <div className="animate-fade-in">
                {loading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
                  </div>
                ) : (
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🛺</span> Rides You Offered
                      </h3>
                      {historyData.offeredRides.length === 0 ? (
                        <div className="bg-slate-50 border border-slate-100 border-dashed rounded-xl p-8 text-center">
                          <p className="text-slate-500">You haven't offered any rides yet.</p>
                        </div>
                      ) : (
                        <div className="grid gap-4">
                          {historyData.offeredRides.map(ride => (
                            <div key={ride._id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-brand-300 transition-colors">
                              <div>
                                <h4 className="font-bold text-slate-800">{ride.pickupLocation} <span className="text-slate-400 font-normal mx-1">&rarr;</span> {ride.dropoffLocation}</h4>
                                <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                  {new Date(ride.departureTime).toLocaleString()}
                                </p>
                              </div>
                              <div className="bg-brand-50 text-brand-700 text-sm font-semibold px-3 py-1 rounded-full self-start sm:self-auto border border-brand-100">
                                Status: {ride.status || 'Active'}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <span className="text-2xl">🎟️</span> Seats You Booked
                      </h3>
                      {historyData.bookedRides.length === 0 ? (
                        <div className="bg-slate-50 border border-slate-100 border-dashed rounded-xl p-8 text-center">
                          <p className="text-slate-500">You haven't booked any seats yet.</p>
                        </div>
                      ) : (
                        <div className="grid gap-4">
                          {historyData.bookedRides.map(ride => (
                            <div key={ride._id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col sm:flex-row justify-between gap-4 hover:border-navy-300 transition-colors">
                              <div>
                                <h4 className="font-bold text-slate-800">{ride.pickupLocation} <span className="text-slate-400 font-normal mx-1">&rarr;</span> {ride.dropoffLocation}</h4>
                                <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                  Departure: {new Date(ride.departureTime).toLocaleString()}
                                </p>
                              </div>
                              <div className="text-sm text-slate-400 flex flex-col items-start sm:items-end">
                                <span className="font-medium text-slate-500">₹{ride.pricePerSeat}</span>
                                <span>Booked: {new Date(ride.bookedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
