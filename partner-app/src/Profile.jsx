import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import { User, Truck, FileText, CreditCard, Settings, ChevronRight, Star, Clock, Package, LogOut, ShieldCheck } from 'lucide-react';

document.title = "Vilarci Partner - Profile";

function Profile() {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [userName, setUserName] = useState("Vilarci Rider"); // Default Name

  // CHECK LOCAL STORAGE WHEN PAGE LOADS
  useEffect(() => {
    // 1. Load Image
    const savedImage = localStorage.getItem('userProfilePic');
    if (savedImage) setProfilePic(savedImage);

    // 2. Load Name from Saved Data
    const savedData = localStorage.getItem('userProfileData');
    if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed.name) setUserName(parsed.name);
    }
  }, []);

  return (
    <div className="page-container" style={{padding:0, paddingBottom:'80px'}}>
      
      {/* 1. HERO HEADER */}
      <div className="profile-hero">
        <div className="profile-top-row">
            {/* PROFILE PICTURE */}
            <div 
                className="profile-pic-lg"
                style={profilePic ? {
                    backgroundImage: `url(${profilePic})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'transparent'
                } : {}}
            >
                {!profilePic && "VR"}
            </div>

            <div className="profile-info">
                <div style={{display:'flex', alignItems:'center', gap:'6px'}}>
                    {/* DYNAMIC NAME HERE */}
                    <h2 style={{margin:0, color:'white', fontSize:'22px'}}>{userName}</h2>
                    <ShieldCheck size={18} color="#4ade80" fill="#4ade80" />
                </div>
                <p style={{margin:'4px 0', color:'rgba(255,255,255,0.8)', fontSize:'14px'}}>ID: #VR-2025-WB</p>
                <span className="badge-glass">Verified Partner</span>
            </div>
        </div>

        {/* ... (Keep Stats Floating Card) ... */}
        <div className="stats-floating">
            <div className="stat-item">
                <Package size={20} color="#eb257b" />
                <span className="stat-num">142</span>
                <span className="stat-lbl">Orders</span>
            </div>
            <div className="stat-line"></div>
            <div className="stat-item">
                <Clock size={20} color="#f59e0b" />
                <span className="stat-num">84h</span>
                <span className="stat-lbl">Online</span>
            </div>
            <div className="stat-line"></div>
            <div className="stat-item">
                <Star size={20} color="#10b981" fill="#10b981" />
                <span className="stat-num">4.9</span>
                <span className="stat-lbl">Rating</span>
            </div>
        </div>
      </div>

      <div style={{height:'60px'}}></div> 

      {/* 3. MENU OPTIONS */}
      <div style={{padding:'16px'}}>
        <h4 style={{color:'#6b7280', fontSize:'13px', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'10px'}}>Account</h4>
        
        <div className="menu-card">
            <MenuItem 
                icon={<User size={20} />} 
                label="Personal Details" 
                value={userName} // SHOW UPDATED NAME HERE TOO
                onClick={() => navigate('/profile/details')}
            />
            <MenuItem 
                icon={<Truck size={20} />} 
                label="Vehicle Info" 
                value="WB-20-X-1234" 
                onClick={() => navigate('/profile/vehicle')}
            />
            <MenuItem 
                icon={<FileText size={20} />} 
                label="Documents" 
                value="Approved" 
                isSuccess 
                onClick={() => navigate('/profile/documents')}
            />
            <MenuItem 
                icon={<CreditCard size={20} />} 
                label="Bank Account" 
                value="HDFC **** 9090" 
            />
        </div>

        {/* ... (Keep App Settings Section) ... */}
        <h4 style={{color:'#6b7280', fontSize:'13px', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'10px', marginTop:'20px'}}>App Settings</h4>

        <div className="menu-card">
            <MenuItem 
                icon={<Settings size={20} />} 
                label="Preferences" 
                onClick={() => navigate('/profile/settings')}
            />
            <div className="menu-row logout">
                <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
                    <div className="icon-box logout-icon"><LogOut size={20} color="#ef4444"/></div>
                    <span style={{fontWeight:'500', color:'#ef4444'}}>Log Out</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

const MenuItem = ({ icon, label, value, isSuccess, onClick }) => (
    <div className="menu-row" onClick={onClick}>
        <div style={{display:'flex', alignItems:'center', gap:'12px'}}>
            <div className="icon-box">{icon}</div>
            <span style={{fontWeight:'500', color:'#374151'}}>{label}</span>
        </div>
        <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
            {value && <span style={{fontSize:'13px', color: isSuccess ? '#10b981' : '#6b7280', fontWeight: isSuccess ? '600' : '400'}}>{value}</span>}
            <ChevronRight size={16} color="#d1d5db" />
        </div>
    </div>
);

export default Profile;