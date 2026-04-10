import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';

const Inbox = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchInbox = async () => {
      try {
        const res = await api.get('/api/messages', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setConversations(res.data);
      } catch (err) {
        console.error('Failed to fetch inbox', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInbox();
  }, [user, navigate]);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-extrabold text-navy-900 mb-8 flex items-center gap-3">
          <svg className="w-8 h-8 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
          Messages
        </h2>

        {loading ? (
          <div className="flex justify-center p-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div></div>
        ) : conversations.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <p className="text-slate-500 text-lg">Your inbox is empty.</p>
            <p className="text-slate-400 mt-2">Book a ride or offer a seat to start chatting!</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col divide-y divide-slate-100">
            {conversations.map((conv, idx) => (
              <Link 
                key={idx} 
                to={`/chat/${conv.partner._id}`}
                state={{ partnerName: conv.partner.name }}
                className="p-4 sm:p-6 hover:bg-slate-50 transition-colors flex items-center gap-4 group"
              >
                <div className="w-14 h-14 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold text-xl flex-shrink-0">
                  {conv.partner.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-bold text-slate-800 truncate group-hover:text-brand-600 transition-colors">{conv.partner.name}</h3>
                    <span className="text-xs font-semibold text-slate-400 ml-2 flex-shrink-0">
                      {new Date(conv.timestamp).toLocaleDateString() === new Date().toLocaleDateString() 
                        ? new Date(conv.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                        : new Date(conv.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={`truncate text-sm ${conv.isUnread ? 'font-bold text-slate-800' : 'text-slate-500'}`}>
                    {conv.latestMessage}
                  </p>
                </div>
                {conv.isUnread && (
                  <div className="w-3 h-3 bg-brand-500 rounded-full flex-shrink-0"></div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Inbox;
