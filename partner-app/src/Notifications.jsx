import React from 'react';
import { ArrowLeft, Bell, Star, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Notifications() {
  const navigate = useNavigate();
  const notifs = [
    { id: 1, type: 'bonus', title: 'Rainy Day Bonus Active', desc: 'Earn ₹20 extra per order due to rain.', time: '20 min ago' },
    { id: 2, type: 'system', title: 'Document Verified', desc: 'Your driving license has been approved.', time: '2 hours ago' },
    { id: 3, type: 'alert', title: 'High Demand Area', desc: 'Go to Sector V for more orders.', time: 'Yesterday' },
  ];

  return (
    <div className="page-container">
       <div className="top-bar" style={{position:'fixed', width:'100%', top:0, left:0, display:'flex', alignItems:'center', gap:'15px'}}>
        <ArrowLeft onClick={() => navigate(-1)} size={24} color="white" />
        <span>Notifications</span>
      </div>
      <div style={{marginTop: '60px'}}></div>

      {notifs.map(n => (
        <div key={n.id} className="card" style={{display:'flex', gap:'15px'}}>
          <div style={{
            background: n.type === 'bonus' ? '#dcfce7' : n.type === 'alert' ? '#fee2e2' : '#e0e7ff',
            padding:'10px', borderRadius:'50%', height:'fit-content'
          }}>
            {n.type === 'bonus' ? <Star size={20} color="#166534" /> : 
             n.type === 'alert' ? <AlertTriangle size={20} color="#991b1b" /> : 
             <Bell size={20} color="#3730a3" />}
          </div>
          <div>
            <div style={{fontWeight:'600', fontSize:'15px'}}>{n.title}</div>
            <div style={{fontSize:'13px', color:'#6b7280', margin:'4px 0'}}>{n.desc}</div>
            <div style={{fontSize:'11px', color:'#9ca3af'}}>{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notifications;