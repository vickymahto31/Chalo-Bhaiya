import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { API_BASE_URL } from '../api';

const OfferRide = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [time, setTime] = useState('');
  const [seats, setSeats] = useState('');
  const [price, setPrice] = useState('');
  const [womenOnly, setWomenOnly] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert("You must be logged in to offer a ride!");
      navigate('/login');
      return;
    }

    setLoading(true);

    const rideData = {
      pickupLocation: pickup,
      dropoffLocation: dropoff,
      departureTime: (() => {
        const today = new Date();
        const [hours, minutes] = time.split(':');
        today.setHours(hours, minutes, 0, 0);
        // If the time is already past, assume they mean tomorrow
        if (today < new Date()) {
          today.setDate(today.getDate() + 1);
        }
        return today.toISOString();
      })(),
      availableSeats: Number(seats),
      pricePerSeat: Number(price),
      womenOnly: womenOnly
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/rides`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(rideData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to publish ride. Please try again.');
      }

      alert(`Success! Your ride from ${pickup} to ${dropoff} is now live.`);
      navigate('/');
      
    } catch (error) {
      console.error("Error creating ride:", error);
      alert(error.message || "Cannot connect to the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-brand-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-navy-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-slate-100 p-8 relative z-10">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800">Offer a Ride</h2>
          <p className="text-slate-500 mt-2 text-sm">Got empty seats? Help out fellow students and split the fare.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Pickup Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400">🟢</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g., Trikon Baug"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="pl-10 w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-slate-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Dropoff Location</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-slate-400">🔴</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g., MU Hostel"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="pl-10 w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-slate-400"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Time</label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Seats Available</label>
              <input
                type="number"
                min="1"
                max="4"
                placeholder="1-4"
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Price per Seat (₹)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-slate-400 font-medium">₹</span>
              </div>
              <input
                type="number"
                min="10"
                placeholder="30"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="pl-8 w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                required
              />
            </div>
          </div>

          {user && user.gender === 'Female' && (
            <div className="flex items-center gap-3 bg-pink-50 p-4 rounded-xl border border-pink-100">
              <input
                type="checkbox"
                id="womenOnly"
                checked={womenOnly}
                onChange={(e) => setWomenOnly(e.target.checked)}
                className="w-5 h-5 text-pink-600 bg-white border-pink-300 rounded focus:ring-pink-500 focus:ring-2"
              />
              <label htmlFor="womenOnly" className="text-sm font-semibold text-pink-800">
                Women-Only Ride 🚺 <span className="text-pink-600 font-normal text-xs block">Only female students will be able to book this ride.</span>
              </label>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center py-3 px-4 mt-8 bg-brand-500 hover:bg-brand-600 text-white shadow-md hover:shadow-lg rounded-xl font-bold text-lg active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Publishing...' : 'Publish Ride'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OfferRide;