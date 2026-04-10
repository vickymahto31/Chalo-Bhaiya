import { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/AuthContext';

const Chat = () => {
  const { partnerId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  const passedPartnerName = location.state?.partnerName || 'Driver';

  useEffect(() => {
    if (!user) {
      toast.error('You must be logged in to chat');
      navigate('/login');
      return;
    }
    
    fetchMessages();
    
    // Simple polling every 5 seconds for new messages
    const interval = setInterval(() => {
      fetchMessages(false); // don't set loading to true
    }, 5000);

    return () => clearInterval(interval);
  }, [partnerId, user]);

  const fetchMessages = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/messages/${partnerId}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMessages(res.data.messages);
      setPartner(res.data.partner);
      
      // Scroll to bottom when new messages arrive
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) {
      console.error(err);
      if (showLoading) toast.error('Failed to load messages');
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const tempMessage = newMessage;
    setNewMessage(''); // optimistic clear
    
    // Optimistically update UI
    const optimisticMsg = {
      _id: Date.now(),
      sender: { _id: user.id },
      receiver: { _id: partnerId },
      content: tempMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, optimisticMsg]);
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);

    try {
      await axios.post('http://localhost:5000/api/messages', {
        receiverId: partnerId,
        content: tempMessage
      }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      
      // No need to fetch immediately since polling will catch it, but doing it guarantees sync
      fetchMessages(false);
    } catch (err) {
      toast.error('Failed to send message');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  const partnerDisplayPhone = partner?.phoneNumber;
  const partnerDisplayName = partner?.name || passedPartnerName;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-100 py-4 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto h-[85vh] bg-white rounded-3xl shadow-lg border border-slate-200 flex flex-col overflow-hidden relative">
        
        {/* Chat Header */}
        <div className="bg-white border-b border-slate-100 flex items-center justify-between px-6 py-4 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-100 rounded-full flex items-center justify-center text-brand-600 font-bold text-lg">
                {partnerDisplayName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{partnerDisplayName}</h3>
                <span className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> User Active
                </span>
              </div>
            </div>
          </div>
          
          {partnerDisplayPhone && (
            <a 
              href={`tel:${partnerDisplayPhone}`} 
              className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 px-4 py-2 rounded-xl transition-colors font-semibold text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span>Call</span>
            </a>
          )}
        </div>

        {/* Chat Body */}
        <div className="flex-1 bg-slate-50/50 p-6 overflow-y-auto flex flex-col gap-4 relative">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>

          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center opacity-70 z-10">
              <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mb-4">
                 <svg className="w-10 h-10 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
              </div>
              <p className="text-slate-500 font-medium">No messages yet.</p>
              <p className="text-slate-400 text-sm">Send a message to coordinate your ride!</p>
            </div>
          ) : (
            <div className="z-10 flex flex-col gap-4">
              {messages.map((msg, index) => {
                const isMine = msg.sender._id === user.id || msg.sender === user.id;
                
                return (
                  <div key={msg._id || index} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-[75%] px-5 py-3 rounded-2xl shadow-sm ${
                        isMine 
                          ? 'bg-brand-500 text-white rounded-br-none' 
                          : 'bg-white border border-slate-100 text-slate-800 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.content}</p>
                      <span className={`text-[10px] uppercase font-bold tracking-wider mt-2 block ${isMine ? 'text-brand-200' : 'text-slate-400'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Box */}
        <div className="bg-white border-t border-slate-100 p-4 z-10">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input 
              type="text" 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all placeholder-slate-400"
            />
            <button 
              type="submit" 
              disabled={!newMessage.trim()}
              className="bg-brand-500 hover:bg-brand-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white p-3 rounded-full shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center w-12 h-12"
            >
              <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Chat;
