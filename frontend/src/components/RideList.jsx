import RideCard from './RideCard';

const RideList = ({ rides }) => {
  if (rides.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-white rounded-2xl border border-slate-100 shadow-sm mt-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900 mb-1">No rides found</h3>
        <p className="text-slate-500">Try adjusting your search locations or check back later!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 mt-8">
      {rides.map(ride => (
        <RideCard key={ride._id || ride.id} ride={ride} />
      ))}
    </div>
  );
};

export default RideList;