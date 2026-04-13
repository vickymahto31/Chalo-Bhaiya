import { useContext, useState } from 'react';
import api from '../api';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RideCard = ({ ride, onRideUpdate }) => {
  const { user } = useContext(AuthContext);
  const [isBooking, setIsBooking] = useState(false);
  const [localSeats, setLocalSeats] = useState(ride.availableSeats);
  const [booked, setBooked] = useState(() => {
    // Check if current user is in the passengers list
    if (!user) return false;
    return ride.passengers?.some(p => {
      const passengerId = p.userId?._id || p.userId;
      return passengerId === user.id || passengerId?.toString() === user.id;
    }) || false;
  });
  const navigate = useNavigate();

  const handleBookSeat = async () => {
    if (!user) {
      toast.error('Please login to book a seat!');
      return;
    }

    if (ride.womenOnly && user.gender !== 'Female') {
      toast.error('This ride is exclusively for women.');
      return;
    }

    try {
      setIsBooking(true);
      const res = await api.post(`/api/rides/${ride._id}/book`, {}, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      
      toast.success(res.data.message || 'Seat booked successfully!');
      setLocalSeats(res.data.ride.availableSeats);
      setBooked(true);

      // Notify parent to refresh if needed
      if (onRideUpdate) onRideUpdate();

      // Ask user if they want to message the driver
      const wantToChat = window.confirm(
        `Seat booked! 🎉 Would you like to message the driver to coordinate?`
      );
      if (wantToChat) {
        navigate(`/chat/${ride.creator._id}`, { state: { partnerName: driverName } });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error booking seat');
    } finally {
      setIsBooking(false);
    }
  };

  const driverName = ride.creator?.name || 'Student';
  const driverPhone = ride.creator?.phoneNumber || '';
  const isMyRide = user && (user.id === ride.creator?._id);

  const handleMessageClick = () => {
    if (!user) {
      toast.error('Please log in to message the driver.');
      navigate('/login');
      return;
    }
    // Navigate to Chat page with the driver's ID
    navigate(`/chat/${ride.creator._id}`, { state: { partnerName: driverName }});
  };

  // Calculate total seats (original seats = available + booked passengers)
  const totalSeats = localSeats + (ride.passengers?.length || 0);

  return (
    <div className={`rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 group relative overflow-hidden flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 ${ride.womenOnly ? 'bg-pink-50/30 border-2 border-pink-100' : 'bg-white border border-slate-100'}`}>
      {/* Decorative accent */}
      <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity ${ride.womenOnly ? 'bg-pink-400' : 'bg-brand-500'}`}></div>
      
      <div className="flex-1 w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-brand-50 rounded-lg">
            <svg className="w-5 h-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800">
            {ride.pickupLocation} <span className="text-slate-400 font-medium mx-1">&rarr;</span> {ride.dropoffLocation}
          </h3>
          {isMyRide && <span className="ml-2 bg-slate-100 text-slate-500 text-xs px-2 py-0.5 rounded-full font-semibold">Your Ride</span>}
          {booked && !isMyRide && <span className="ml-2 bg-emerald-100 text-emerald-600 text-xs px-2 py-0.5 rounded-full font-semibold">✓ Booked</span>}
          {ride.womenOnly && <span className="ml-2 bg-pink-100 text-pink-600 border border-pink-200 text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1"><span>🚺</span> Women Only</span>}
        </div>
        
        <div className="flex flex-wrap items-center gap-y-3 gap-x-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="font-medium">{new Date(ride.departureTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            <span className="font-medium bg-slate-100 px-2 py-0.5 rounded-full">{localSeats} / {totalSeats} seats</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="https://cdn-icons-png.flaticon.com/128/3033/3033143.png" alt="driver" className="w-5 h-5 opacity-60" />
            <span className="font-medium">{driverName}</span>
          </div>
        </div>

        {/* Contact Strip */}
        <div className="mt-4 flex flex-wrap gap-3">
           {driverPhone && !isMyRide && (
             <a href={`tel:${driverPhone}`} className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg hover:bg-emerald-100 transition-colors">
               <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
               Call Driver
             </a>
           )}
           {!isMyRide && ride.creator?._id && (
             <button onClick={handleMessageClick} className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1.5 rounded-lg hover:bg-brand-100 transition-colors">
               <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path></svg>
               Message
             </button>
           )}
        </div>
      </div>

      <div className="w-full sm:w-auto flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 sm:border-l border-slate-100 pt-4 sm:pt-0 sm:pl-6">
        <div className="text-left sm:text-right">
          <span className="block text-3xl font-extrabold text-brand-500">₹{ride.pricePerSeat || 0}</span>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">per seat</span>
        </div>
        {booked && !isMyRide ? (
          <button 
            className="mt-0 sm:mt-4 bg-emerald-600 text-white font-semibold py-2.5 px-6 rounded-xl shadow-sm cursor-default"
            disabled
          >
            ✓ Booked
          </button>
        ) : (
          <button 
            className="mt-0 sm:mt-4 bg-navy-800 hover:bg-navy-900 text-white font-semibold py-2.5 px-6 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleBookSeat}
            disabled={isBooking || localSeats === 0 || isMyRide}
          >
            {isMyRide ? 'Your Ride' : (isBooking ? 'Booking...' : (localSeats === 0 ? 'Full' : 'Book Seat'))}
          </button>
        )}
      </div>
    </div>
  );
};

export default RideCard;