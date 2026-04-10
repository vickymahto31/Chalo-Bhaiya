import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchFilter from '../components/SearchFilter';
import RideList from '../components/RideList';

const FindRide = () => {
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch live rides on component mount
  useEffect(() => {
    const fetchRides = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/rides');
        setRides(res.data);
        setFilteredRides(res.data); // Initially show all valid rides
      } catch (err) {
        console.error('Failed to fetch rides', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, []);

  const handleSearch = (pickup, dropoff) => {
    if (!pickup && !dropoff) {
      setFilteredRides(rides);
      return;
    }

    const results = rides.filter(ride => {
      const matchPickup = pickup ? ride.pickupLocation.toLowerCase().includes(pickup.toLowerCase()) : true;
      const matchDropoff = dropoff ? ride.dropoffLocation.toLowerCase().includes(dropoff.toLowerCase()) : true;
      return matchPickup && matchDropoff;
    });
    setFilteredRides(results);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-navy-900 pt-16 pb-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">Find your perfect ride</h2>
          <p className="text-slate-300 text-lg">Search for available seats in autos heading your way.</p>
        </div>
      </div>
      
      <div className="px-4">
        <SearchFilter onSearch={handleSearch} />
        <div className="max-w-4xl mx-auto">
          <RideList rides={filteredRides} />
        </div>
      </div>
    </div>
  );
};

export default FindRide;