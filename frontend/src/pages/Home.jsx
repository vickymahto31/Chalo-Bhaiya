import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HeroSection />

      {/* How it Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-navy-800 sm:text-4xl">How Chalo Bhaiya Works</h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Your daily campus commute made simple, affordable, and social.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <span className="text-3xl">📍</span>
            </div>
            <h3 className="text-xl font-bold text-navy-800 mb-3">Search Routes</h3>
            <p className="text-slate-500 leading-relaxed">
              Enter your pickup location in Rajkot and see who is heading to campus at the same time.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-navy-800 mb-3">Book a Seat</h3>
            <p className="text-slate-500 leading-relaxed">
              Claim your spot in a shared auto. Know your driver and your fellow student co-passengers.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-100 flex flex-col items-center text-center group">
            <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
              <span className="text-3xl">💰</span>
            </div>
            <h3 className="text-xl font-bold text-navy-800 mb-3">Split the Fare</h3>
            <p className="text-slate-500 leading-relaxed">
              Save money by dividing the auto meter exactly by the number of seats occupied.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <div className="bg-brand-50 border-t border-brand-100 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-brand-900 font-medium flex items-center justify-center gap-2">
            <svg className="w-5 h-5 text-brand-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
            Exclusive to authenticated university students.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;