import React, { useState } from 'react';
import './App.css';
import { Phone, MessageCircle, Mail, ChevronDown, ChevronRight, AlertTriangle, Headphones, Clock, CheckCircle, MapPin, X, PhoneCall } from 'lucide-react';
// 1. IMPORT CAPACITOR PLUGIN (Keep this if you are using it)
import { Geolocation } from '@capacitor/geolocation'; 

function Support() {
  const [openFaq, setOpenFaq] = useState(null);
  const [showSosModal, setShowSosModal] = useState(false);
  const [isLocLoading, setIsLocLoading] = useState(false);

  // --- NEW: CONTACT HANDLERS ---
  const handleCallSupport = () => {
    window.location.href = 'tel:+919999999999'; // Replace with your support number
  };

  const handleWhatsApp = () => {
    // Opens WhatsApp with a pre-filled message
    const number = "919999999999"; // Your WhatsApp number (with country code, no +)
    const message = "Hi, I need help with my Vilarci Partner account.";
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:support@vilarci.com?subject=Partner Support Request';
  };
  // -----------------------------

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleCallPolice = () => {
    window.location.href = 'tel:112';
  };

  const handleSendLocation = async () => {
    setIsLocLoading(true);
    try {
        const coordinates = await Geolocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000
        });
        const lat = coordinates.coords.latitude;
        const lng = coordinates.coords.longitude;

        setTimeout(() => {
            alert(`⚠️ EMERGENCY ALERT TRIGGERED ⚠️\n\n📍 LOCATION CAPTURED:\nLatitude: ${lat}\nLongitude: ${lng}\n\n(Sent via Vilarci Android App)`);
            setIsLocLoading(false);
            setShowSosModal(false);
        }, 1000);

    } catch (error) {
        alert("GPS ERROR: " + error.message);
        setIsLocLoading(false);
    }
  };

  return (
    <div className="page-container" style={{padding: 0, background: '#f8fafc', minHeight: '100vh'}}>
      
      {/* HERO SECTION */}
      <div className="support-hero">
        <div className="support-avatar">
          <Headphones size={28} />
        </div>
        <h2 style={{margin:'0 0 5px 0', fontSize:'20px'}}>Hello, Partner</h2>
        <p style={{margin:0, color:'#6b7280', fontSize:'14px'}}>We are here to help you 24/7</p>
        
        <div style={{display:'flex', justifyContent:'center', gap:'20px', marginTop:'15px', fontSize:'12px', color:'#6b7280'}}>
            <span style={{display:'flex', alignItems:'center', gap:'4px'}}><Clock size={14}/> Wait time: ~2 min</span>
            <span style={{display:'flex', alignItems:'center', gap:'4px', color:'#10b981'}}><CheckCircle size={14}/> Systems Online</span>
        </div>
      </div>

      <div style={{padding: '0 16px'}}>
        
        {/* QUICK ACTIONS (UPDATED WITH ONCLICK) */}
        <h3 style={{fontSize:'14px', color:'#637391', textTransform:'uppercase', letterSpacing:'1px', marginBottom:'12px'}}>Contact Us</h3>
        <div className="action-grid">
            <ActionCard 
                icon={<Phone size={20} color="white"/>} 
                label="Call Us" 
                color="#2563eb" 
                onClick={handleCallSupport} 
            />
            <ActionCard 
                icon={<MessageCircle size={20} color="white"/>} 
                label="WhatsApp" 
                color="#10b981" 
                onClick={handleWhatsApp} 
            />
            <ActionCard 
                icon={<Mail size={20} color="white"/>} 
                label="Email" 
                color="#f59e0b" 
                onClick={handleEmail} 
            />
        </div>

        {/* RECENT TICKETS */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'12px'}}>
            <h3 style={{fontSize:'14px', color:'#6b7280', textTransform:'uppercase', letterSpacing:'1px', margin:0}}>Recent Tickets</h3>
            <span style={{color:'#2563eb', fontSize:'12px', fontWeight:'600'}}>View All</span>
        </div>

        <div className="ticket-card">
            <div>
                <div style={{fontWeight:'600', fontSize:'14px'}}>Payout Issue - #TK992</div>
                <div style={{fontSize:'12px', color:'#6b7280', marginTop:'2px'}}>Closed • 12 Jan</div>
            </div>
            <span className="badge delivered">Resolved</span>
        </div>
        <div className="ticket-card">
            <div>
                <div style={{fontWeight:'600', fontSize:'14px'}}>Bonus Issue - #TK991</div>
                <div style={{fontSize:'12px', color:'#6b7280', marginTop:'2px'}}>Opened • 2 Jan</div>
            </div>
            <span className="badge pending">Pending</span>
        </div>

        {/* FAQ */}
        <div className="faq-container">
            <FaqItem question="How do I change my shift timings?" answer="Go to Profile > Preferences. You can request a shift change there." isOpen={openFaq === 0} onClick={() => toggleFaq(0)} />
            <FaqItem question="When will I receive my weekly payout?" answer="Payouts are processed every Wednesday for the previous week." isOpen={openFaq === 1} onClick={() => toggleFaq(1)} />
        </div>
      </div>

      {/* SOS BUTTON */}
      <div className="sos-float" onClick={() => setShowSosModal(true)} style={{cursor:'pointer'}}>
        <AlertTriangle size={20} fill="white" />
        <span>EMERGENCY SOS</span>
      </div>

      {/* SOS OVERLAY */}
      {showSosModal && (
        <div className="sos-overlay">
            <div className="sos-alert-box">
                <div style={{width:'80px', height:'80px', background:'#fee2e2', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px auto'}}>
                    <AlertTriangle size={40} color="#ef4444" fill="#ef4444" />
                </div>
                
                <h2 className="sos-title">Emergency Mode</h2>
                <p className="sos-desc">Use this only if you are in immediate danger or need medical assistance.</p>

                <button className="sos-btn-large sos-btn-police" onClick={handleCallPolice}>
                    <PhoneCall size={20} />
                    CALL POLICE (112)
                </button>

                <button className="sos-btn-large sos-btn-admin" onClick={handleSendLocation} disabled={isLocLoading}>
                    <MapPin size={20} />
                    {isLocLoading ? "FETCHING GPS..." : "ALERT VILARCI ADMIN"}
                </button>

                <button className="sos-btn-large sos-btn-cancel" onClick={() => setShowSosModal(false)}>
                    <X size={20} />
                    CANCEL
                </button>
            </div>
        </div>
      )}

    </div>
  );
}

// --- UPDATED HELPER COMPONENT (Accepts onClick) ---
const ActionCard = ({ icon, label, color, onClick }) => (
    <div className="action-card" onClick={onClick} style={{cursor: 'pointer'}}>
        <div className="action-icon-box" style={{backgroundColor: color}}>
            {icon}
        </div>
        <span style={{fontSize:'12px', fontWeight:'600', color:'#374151'}}>{label}</span>
    </div>
);

// ... (Keep FaqItem Helper same as before)
const FaqItem = ({ question, answer, isOpen, onClick }) => (
    <div className="faq-box">
        <div className="faq-question" onClick={onClick}>
            <span>{question}</span>
            {isOpen ? <ChevronDown size={18} color="#6b7280" /> : <ChevronRight size={18} color="#d1d5db" />}
        </div>
        <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
            {answer}
        </div>
    </div>
);

export default Support;