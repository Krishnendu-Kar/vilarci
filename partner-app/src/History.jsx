import React, { useState } from 'react';
import './App.css';
import { MapPin } from 'lucide-react';

function History() {
  const [filter, setFilter] = useState('All'); // 'All', 'Delivered', 'Cancelled'

  const allOrders = [
    { id: '77890', loc: 'Salt Lake Sec-V', price: '₹40', status: 'Delivered', time: 'Today, 2:00 PM' },
    { id: '77885', loc: 'New Town Action Area 1', price: '₹120', status: 'Delivered', time: 'Yesterday' },
    { id: '77812', loc: 'Chingrighata', price: '₹30', status: 'Cancelled', time: '09 Jan' },
    { id: '77750', loc: 'Park Street', price: '₹85', status: 'Delivered', time: '08 Jan' },
    { id: '77620', loc: 'Lake Town', price: '₹55', status: 'Cancelled', time: '07 Jan' },
  ];

  // Logic to filter the list
  const filteredOrders = allOrders.filter(order => {
    if (filter === 'All') return true;
    return order.status === filter;
  });

  // Helper to make buttons look active or inactive
  const getButtonStyle = (btnName) => {
    // Map 'Completed' button to 'Delivered' status for styling check
    const statusName = btnName === 'Completed' ? 'Delivered' : btnName;
    const isActive = filter === (btnName === 'All Orders' ? 'All' : statusName);
    
    return {
      background: isActive ? '#eb4925f8' : 'white',
      color: isActive ? 'white' : '#374151',
      border: isActive ? 'none' : '1px solid #e5e7eb',
      padding: '8px 16px',
      borderRadius: '20px',
      fontSize: '13px',
      whiteSpace: 'nowrap',
      transition: '0.2s'
    };
  };

  return (
    <div className="page-container">
      {/* FILTER TABS */}
      <div style={{display:'flex', gap:'10px', overflowX:'auto', paddingBottom:'10px', marginBottom:'10px'}}>
        
        <button 
          onClick={() => setFilter('All')} 
          style={getButtonStyle('All Orders')}
        >
          All Orders
        </button>

        <button 
          onClick={() => setFilter('Delivered')} 
          style={getButtonStyle('Completed')}
        >
          Completed
        </button>

        <button 
          onClick={() => setFilter('Cancelled')} 
          style={getButtonStyle('Cancelled')}
        >
          Cancelled
        </button>

      </div>

      {/* ORDER LIST */}
      {filteredOrders.length === 0 ? (
        <div style={{textAlign:'center', marginTop:'50px', color:'#9ca3af'}}>
          No orders found.
        </div>
      ) : (
        filteredOrders.map(order => (
          <div key={order.id} className="card">
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                  <span style={{fontSize:'12px', color:'#6b7280'}}>ORDER #{order.id}</span>
                  <span className={`badge ${order.status.toLowerCase()}`}>{order.status}</span>
              </div>
              <div style={{display:'flex', gap:'10px', alignItems:'center', marginBottom:'12px'}}>
                  <div style={{background:'#f3f4f6', padding:'8px', borderRadius:'50%'}}>
                    <MapPin size={18} color="#4b5563"/>
                  </div>
                  <div>
                      <div style={{fontWeight:'600', fontSize:'15px'}}>{order.loc}</div>
                      <div style={{fontSize:'12px', color:'#9ca3af'}}>{order.time}</div>
                  </div>
                  <div style={{marginLeft:'auto', fontSize:'16px', fontWeight:'700'}}>{order.price}</div>
              </div>
          </div>
        ))
      )}
    </div>
  );
}

export default History;