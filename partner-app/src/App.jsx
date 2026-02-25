// Add this import at the top of App.jsx
import { SyncProvider } from './SyncManager';
import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, History, User, Wallet as WalletIcon, Headphones, Package, Bell, ChevronRight } from 'lucide-react';
import './App.css';

// Import Pages (Keep your existing imports)
import HistoryPage from './History';
import ProfilePage from './Profile';
import WalletPage from './Wallet';
import SupportPage from './Support';
import OrderDetails from './OrderDetails';
import Notifications from './Notifications';
// --- IMPORT NEW PROFILE SUB-PAGES ---
// Ensure you created ProfilePages.jsx with the code from the previous step!
import { PersonalDetails, VehicleDetails, Documents, SettingsPage } from './ProfilePages';

// --- NEW SWIPE BUTTON COMPONENT ---
const SwipeButton = ({ onSwipeSuccess }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragWidth, setDragWidth] = useState(55); // Initial width (circle size)
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const threshold = 0.9; // 90% swipe to trigger

  const handleStart = (clientX) => {
    setIsDragging(true);
    startXRef.current = clientX;
  };

  const handleMove = (clientX) => {
    if (!isDragging || !containerRef.current) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const currentDrag = clientX - startXRef.current + 55; // 55 is initial thumb width
    
    // Limit drag bounds
    if (currentDrag >= 55 && currentDrag <= containerWidth) {
      setDragWidth(currentDrag);
    }
  };

  const handleEnd = () => {
    if (!containerRef.current) return;
    setIsDragging(false);
    
    const containerWidth = containerRef.current.offsetWidth;
    
    if (dragWidth > containerWidth * threshold) {
      // Success! Snap to full width and trigger action
      setDragWidth(containerWidth);
      onSwipeSuccess();
    } else {
      // Reset position
      setDragWidth(55);
    }
  };

  // Touch Events
  const onTouchStart = (e) => handleStart(e.touches[0].clientX);
  const onTouchMove = (e) => handleMove(e.touches[0].clientX);
  const onTouchEnd = () => handleEnd();

  // Mouse Events (for desktop testing)
  const onMouseDown = (e) => handleStart(e.clientX);
  const onMouseMove = (e) => handleMove(e.clientX);
  const onMouseUp = () => handleEnd();
  const onMouseLeave = () => { if(isDragging) handleEnd(); };

  return (
    <div 
      className="swipe-container" 
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      <div className="swipe-text">Swipe to Accept &nbsp; &gt;&gt;</div>
      <div 
        className="swipe-thumb" 
        style={{ width: `${dragWidth}px` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
      >
        <div className="swipe-icon">
            <ChevronRight size={24} />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();

  const handleOrderAccept = () => {
    // Add a small delay for the animation to finish before navigating
    setTimeout(() => {
        navigate('/order-details');
    }, 300);
  };

  return (
    <div className="page-container" style={{paddingTop: 0}}>
      {/* HEADER WITH NOTIFICATION BELL */}
      <div className="duty-toggle-container">
        <div className="duty-status">
          <div className={`online-dot`} style={{backgroundColor: isOnline ? '#10b981' : '#ef4444'}}></div>
          {isOnline ? "YOU ARE ONLINE" : "YOU ARE OFFLINE"}
        </div>
        <div style={{display:'flex', gap:'15px', alignItems:'center'}}>
            <label className="switch">
            <input type="checkbox" checked={isOnline} onChange={() => setIsOnline(!isOnline)} />
            <span className="slider round"></span>
            </label>
            <Bell size={22} color="#4b5563" onClick={() => navigate('/notifications')} />
        </div>
      </div>

      <h3 style={{margin: '10px 0', fontSize: '16px', color:'#6b7280'}}>Active Orders (99799)</h3>

      {/* ORDER CARD */}
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px', borderBottom:'1px solid #eee', paddingBottom:'10px'}}>
          <span style={{fontWeight:'bold'}}>#ORD-77901</span>
          <span className="badge cod">COD: ₹450</span>
        </div>
        
        <div style={{display:'flex', gap:'12px', marginBottom:'16px'}}>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'4px'}}>
            <div style={{width:'10px', height:'10px', background:'#2450ae', borderRadius:'50%'}}></div>
            <div style={{width:'2px', height:'30px', background:'#e5e7eb'}}></div>
            <div style={{width:'10px', height:'10px', background:'#10b981', borderRadius:'50%'}}></div>
          </div>
          <div style={{flex:1}}>
            <div style={{marginBottom:'16px'}}>
              <div style={{color:'#6b7280', fontSize:'12px'}}>PICKUP • 1.2 km</div>
              <div style={{fontWeight:'600'}}>Vilarci Warehouse, Kolkata</div>
            </div>
            <div>
              <div style={{color:'#6b7280', fontSize:'12px'}}>DROP • 4.5 km</div>
              <div style={{fontWeight:'600'}}>Amit Roy, Sector 5</div>
            </div>
          </div>
        </div>

        {/* REPLACED BUTTON WITH SWIPE COMPONENT */}
        <SwipeButton onSwipeSuccess={handleOrderAccept} />
      </div>
      <div className="card">
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:'12px', borderBottom:'1px solid #eee', paddingBottom:'10px'}}>
          <span style={{fontWeight:'bold'}}>#ORD-77908</span>
          <span className="badge prepaid">Prepaid</span>
        </div>
        
        <div style={{display:'flex', gap:'12px', marginBottom:'16px'}}>
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'4px'}}>
            <div style={{width:'10px', height:'10px', background:'#2450ae', borderRadius:'50%'}}></div>
            <div style={{width:'2px', height:'30px', background:'#e5e7eb'}}></div>
            <div style={{width:'10px', height:'10px', background:'#10b981', borderRadius:'50%'}}></div>
          </div>
          <div style={{flex:1}}>
            <div style={{marginBottom:'16px'}}>
              <div style={{color:'#6b7280', fontSize:'12px'}}>PICKUP • 300m</div>
              <div style={{fontWeight:'600'}}>Maatara Shop</div>
            </div>
            <div>
              <div style={{color:'#6b7280', fontSize:'12px'}}>DROP • 5 km</div>
              <div style={{fontWeight:'600'}}>Radhaballavpur</div>
            </div>
          </div>
        </div>

        {/* REPLACED BUTTON WITH SWIPE COMPONENT */}
        <SwipeButton onSwipeSuccess={handleOrderAccept} />
      </div>
    </div>
  );
};

function Navigation() {
  const location = useLocation();
  const getClass = (path) => location.pathname === path ? "nav-item active" : "nav-item";
  return (
    <nav className="bottom-nav">
      <Link to="/" className={getClass("/")}><Home size={22} /><span>Home</span></Link>
      <Link to="/wallet" className={getClass("/wallet")}><WalletIcon size={22} /><span>Earnings</span></Link>
      <Link to="/history" className={getClass("/history")}><History size={22} /><span>History</span></Link>
      <Link to="/profile" className={getClass("/profile")}><User size={22} /><span>Profile</span></Link>
    </nav>
  );
}

function App() {
  return (
    <SyncProvider> {/* <-- OPENING TAG */}
      <Router>
        <div className="app-wrapper">
          <header className="top-bar">
              <div style={{display:'flex', marginTop:'10px', justifyContent:'space-between', alignItems:'center'}}>
                  <span>Vilarci Partner</span>
                  <Link to="/support" style={{color:'white'}}><Headphones size={20}/></Link>
              </div>
          </header>
          
          <div className="content-area">
            <Routes>
              {/* MAIN TAB ROUTES */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/support" element={<SupportPage />} />
              
              {/* FEATURE ROUTES */}
              <Route path="/order-details" element={<OrderDetails />} />
              <Route path="/notifications" element={<Notifications />} />

              {/* --- NEW PROFILE SUB-PAGE ROUTES --- */}
              <Route path="/profile/details" element={<PersonalDetails />} />
              <Route path="/profile/vehicle" element={<VehicleDetails />} />
              <Route path="/profile/documents" element={<Documents />} />
              <Route path="/profile/settings" element={<SettingsPage />} />
            </Routes>
          </div>
          <Navigation />
        </div>
      </Router>
    </SyncProvider> 
  );
}

export default App;
