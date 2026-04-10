import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Import Pages
import Home from './pages/Home';
import FindRide from './pages/FindRide';
import OfferRide from './pages/OfferRide';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import Inbox from './pages/Inbox';
import TrackRide from './pages/TrackRide';
const App = () => {
  return (
    // We put the BrowserRouter right here at the very top level of the App!
    <Router>
      <AuthProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <ToastContainer position="top-right" autoClose={3000} />
          
          <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-ride" element={<FindRide />} />
            <Route path="/offer-ride" element={
              <ProtectedRoute>
                <OfferRide />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/chat/:partnerId" element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            } />
            <Route path="/inbox" element={
              <ProtectedRoute>
                <Inbox />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/track-ride" element={
              <ProtectedRoute>
                <TrackRide />
              </ProtectedRoute>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
      </AuthProvider>
    </Router>
  );
};

export default App;