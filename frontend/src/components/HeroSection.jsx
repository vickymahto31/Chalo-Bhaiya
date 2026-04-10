import { Link } from 'react-router-dom';

const HeroSection = () => (
  <div className="relative bg-navy-900 overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1593950315186-76a92975b60c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center mix-blend-multiply opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-transparent"></div>
    </div>
    
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block mb-2">Share your auto ride</span>
          <span className="block text-brand-500">to campus.</span>
        </h1>
        <p className="mt-6 text-xl text-slate-300 max-w-2xl mx-auto">
          Split the fare, save money, and never wait alone for an auto again. Join hundreds of students already saving on their daily commute.
        </p>
        <div className="mt-10 flex justify-center gap-4 flex-col sm:flex-row">
          <Link
            to="/find-ride"
            className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-full text-white bg-brand-500 hover:bg-brand-600 shadow-lg hover:shadow-brand-500/30 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            Find a Ride
          </Link>
          <Link
            to="/offer-ride"
            className="inline-flex items-center justify-center px-8 py-3 border-2 border-slate-300 text-base font-semibold rounded-full text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 hover:border-white"
          >
            Offer a Ride
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default HeroSection;