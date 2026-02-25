import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Navigation, CheckSquare, Square, ArrowLeft } from 'lucide-react';
import './App.css';

function OrderDetails() {
  const navigate = useNavigate();
  const [status, setStatus] = useState('pickup'); // 'pickup' or 'drop'
  const [itemsChecked, setItemsChecked] = useState([false, false]);

  // 📍 COORDINATES (Demo Data for Kolkata)
  // Pickup: Vilarci Warehouse (Salt Lake Sec V)
  // Drop: Customer Home (New Town)
  const locations = {
    pickup: { lat: 22.5726, lng: 88.4174, label: "Vilarci Warehouse" },
    drop:   { lat: 22.5958, lng: 88.4735, label: "Customer Location" }
  };

  const toggleCheck = (index) => {
    const newChecks = [...itemsChecked];
    newChecks[index] = !newChecks[index];
    setItemsChecked(newChecks);
  };

  const handleAction = () => {
    if (status === 'pickup') {
      setStatus('drop');
      setItemsChecked([false, false]); // Reset checklist for next stage
      window.scrollTo(0,0);
    } else {
      navigate('/history');
    }
  };

// 🗺️ THIS FUNCTION OPENS THE REAL GOOGLE MAPS APP
  const openMap = () => {
    // 1. Decide which location to use based on current status
    const target = status === 'pickup' ? locations.pickup : locations.drop;
    
    // 2. Create the Universal Google Maps Link
    // "destination" tells maps where to go.
    // "travelmode=driving" tells it to start car navigation.
    const url = `https://www.google.com/maps/dir/?api=1&destination=${target.lat},${target.lng}&travelmode=driving`;

    // 3. Open it outside the app
    window.open(url, '_system');
  };

  return (
    <div className="page-container" style={{paddingBottom: '20px'}}>
      {/* HEADER */}
      <div className="top-bar" style={{position:'fixed', width:'100%', top:0, left:0, display:'flex', alignItems:'center', gap:'15px'}}>
        <ArrowLeft onClick={() => navigate(-1)} size={24} color="white" />
        <span>Order #ORD-77901</span>
      </div>

      <div style={{marginTop: '60px'}}></div>

      {/* MAP PLACEHOLDER (Now Clickable) */}
      <div className="map-placeholder" style={{background: '#e0f2fe'}}>
        <Navigation size={48} color="#2563eb" />
        <p style={{color:'#1e40af', fontWeight:'500'}}>
          Navigating to {status === 'pickup' ? 'Merchant' : 'Customer'}
        </p>
        
        {/* THE MAGIC BUTTON */}
        <button className="btn-secondary" onClick={openMap} style={{display:'flex', alignItems:'center', gap:'8px', background:'white', border:'1px solid #2563eb', color:'#2563eb'}}>
          <MapPin size={16} /> Open Google Maps
        </button>
      </div>

      {/* ACTION CARD */}
      <div className="card" style={{marginTop: '-20px', position: 'relative', zIndex: 10, borderRadius: '20px 20px 0 0', border: 'none', boxShadow:'0 -4px 10px rgba(0,0,0,0.05)'}}>
        
        {/* CUSTOMER / MERCHANT DETAILS */}
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
          <div>
            <span className="badge" style={{background: status === 'pickup' ? '#dbeafe' : '#dcfce7', color: status === 'pickup' ? '#1e40af' : '#166534', fontSize:'12px', marginBottom:'5px', display:'inline-block'}}>
              {status === 'pickup' ? 'PICKUP LOCATION' : 'DROP LOCATION'}
            </span>
            <h2 style={{margin:'5px 0', fontSize:'20px'}}>
              {status === 'pickup' ? 'Vilarci Warehouse' : 'Amit Roy'}
            </h2>
            <p style={{color:'#6b7280', fontSize:'14px', margin:0}}>
              {status === 'pickup' ? 'Sector 5, Salt Lake, Kolkata' : 'Block B, New Town Heights'}
            </p>
          </div>
          <div className="call-btn" onClick={() => window.open('tel:9876543210', '_system')}>
            <Phone size={24} color="white" />
          </div>
        </div>

        <hr style={{border:'none', borderTop:'1px solid #f3f4f6', margin:'15px 0'}} />

        {/* ORDER ITEMS CHECKLIST */}
        <h4 style={{margin:'0 0 15px 0'}}>Verify Items</h4>
        <div className="item-list">
          <div className="check-item" onClick={() => toggleCheck(0)}>
            {itemsChecked[0] ? <CheckSquare color="#2563eb" /> : <Square color="#9ca3af" />}
            <span>2x Wireless Mouse (Logitech)</span>
          </div>
          <div className="check-item" onClick={() => toggleCheck(1)}>
            {itemsChecked[1] ? <CheckSquare color="#2563eb" /> : <Square color="#9ca3af" />}
            <span>1x Mechanical Keyboard</span>
          </div>
        </div>

        {/* BIG ACTION BUTTON */}
        <div style={{marginTop:'30px'}}>
          <button 
            className={`slide-btn ${status}`} 
            onClick={handleAction}
          >
            {status === 'pickup' ? 'CONFIRM PICKUP' : 'MARK DELIVERED'}
          </button>
        </div>

      </div>
    </div>
  );
}

export default OrderDetails;