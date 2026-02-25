import React, { useState } from 'react';
import './App.css';
import { ArrowUpRight, ArrowDownLeft, AlertCircle, TrendingUp, CreditCard } from 'lucide-react';

function Wallet() {
  const [filter, setFilter] = useState('Weekly');

  // 📊 DATASETS (Only 'val' is needed now, height is calculated automatically)
  const dailyData = [
    { label: '10am', val: 400 },
    { label: '12pm', val: 120 },
    { label: '2pm', val: 180 },
    { label: '4pm', val: 90 },
    { label: '6pm', val: 240 },
    { label: '8pm', val: 300 },
    { label: '10pm', val: 150 },
  ];

  const weeklyData = [
    { label: 'Mon', val: 850 },
    { label: 'Tue', val: 620 },
    { label: 'Wed', val: 900 },
    { label: 'Thu', val: 1100 },
    { label: 'Fri', val: 1500 },
    { label: 'Sat', val: 1850 },
    { label: 'Sun', val: 1300 },
  ];

  const monthlyData = [
    { label: 'Wk 1', val: 4500 },
    { label: 'Wk 2', val: 1000 },
    { label: 'Wk 3', val: 3800 },
    { label: 'Wk 4', val: 8100 },
  ];

  // 🔄 SELECT DATA
  let currentData = weeklyData;
  let totalLabel = "Total this week";
  
  if (filter === 'Daily') {
    currentData = dailyData;
    totalLabel = "Total today";
  } else if (filter === 'Monthly') {
    currentData = monthlyData;
    totalLabel = "Total this month";
  }

  // 🧮 CALCULATE TOTAL & MAX VALUE (For Graph Scaling)
  const currentTotal = currentData.reduce((acc, item) => acc + item.val, 0);
  const maxVal = Math.max(...currentData.map(d => d.val));

  // 📈 GENERATE SVG POINTS
  // We map the data values to X,Y coordinates inside a 300x100 box
  const graphWidth = 300;
  const graphHeight = 100;
  
  const points = currentData.map((d, i) => {
    const x = (i / (currentData.length - 1)) * graphWidth;
    // Invert Y because SVG 0 is at the top
    const y = graphHeight - ((d.val / maxVal) * (graphHeight - 20)); 
    return { x, y, label: d.label, val: d.val };
  });

  // Create the "polyline" string (e.g., "0,100 50,20 100,80...")
  const polylinePoints = points.map(p => `${p.x},${p.y}`).join(' ');


  const transactions = [
    { id: 1, title: 'Delivery #ORD-77901', time: 'Today, 10:30 AM', amount: '₹40.00', type: 'credit' },
    { id: 2, title: 'Weekly Bonus', time: 'Today, 09:00 AM', amount: '₹250.00', type: 'credit' },
    { id: 3, title: 'COD Cash Collection', time: 'Yesterday', amount: '₹1,250.00', type: 'pending' },
    { id: 4, title: 'Petrol Allowance', time: '08 Jan', amount: '₹50.00', type: 'credit' },
  ];

  // Toggle Button Style
  const getToggleStyle = (name) => ({
    padding: '6px 12px',
    background: filter === name ? 'white' : 'transparent',
    borderRadius: '6px',
    boxShadow: filter === name ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
    cursor: 'pointer',
    fontWeight: filter === name ? '600' : '400',
    fontSize: '11px',
    transition: '0.2s',
    color: filter === name ? '#10b981' : '#6b7280' // Green when active
  });

  return (
    <div className="page-container">
      
      {/* ⚠️ COD CASH ALERT */}
      <div className="card" style={{background:'#fff7ed', border:'1px solid #fdba74', display:'flex', gap:'12px', alignItems:'center'}}>
         <div style={{background:'#ffedd5', padding:'8px', borderRadius:'50%'}}>
            <AlertCircle color="#ea580c" size={24} />
         </div>
         <div style={{flex:1}}>
            <div style={{color:'#9a3412', fontWeight:'700', fontSize:'15px'}}>Cash in Hand: ₹1,250</div>
            <div style={{color:'#c2410c', fontSize:'12px'}}>Deposit before ₹2,000 limit.</div>
         </div>
         <button style={{background:'#ea580c', color:'white', border:'none', padding:'8px 16px', borderRadius:'8px', fontSize:'12px', fontWeight:'600'}}>
            Deposit
         </button>
      </div>

      {/* 💳 MAIN BALANCE CARD */}
      <div className="wallet-gradient">
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
            <div>
                <div style={{opacity:0.9, fontSize:'13px', marginBottom:'4px'}}>Available for Payout</div>
                <div style={{fontSize:'36px', fontWeight:'700', marginBottom:'5px'}}>₹4,520<span style={{fontSize:'18px'}}>.50</span></div>
            </div>
            <div style={{background:'rgba(255,255,255,0.2)', padding:'8px', borderRadius:'12px'}}>
                <CreditCard color="white" size={24}/>
            </div>
        </div>
        <div style={{fontSize:'12px', opacity:0.8, marginBottom:'20px'}}>Next automatic payout: Tuesday, 14 Jan</div>
        <div style={{display:'flex', gap:'12px'}}>
            <button className="btn-withdraw">Withdraw Now</button>
            <button className="btn-add-money">Add Money</button>
        </div>
      </div>

      {/* 📊 LINE GRAPH SECTION (SVG) */}
      <div className="card">
         <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <TrendingUp size={18} color="#10b981"/>
                <h4 style={{margin:0, fontSize:'16px'}}>Earnings</h4>
            </div>
            
            <div style={{background:'#f3f4f6', padding:'3px', borderRadius:'8px', display:'flex'}}>
                <span onClick={()=>setFilter('Daily')} style={getToggleStyle('Daily')}>Daily</span>
                <span onClick={()=>setFilter('Weekly')} style={getToggleStyle('Weekly')}>Weekly</span>
                <span onClick={()=>setFilter('Monthly')} style={getToggleStyle('Monthly')}>Monthly</span>
            </div>
         </div>
         
         {/* --- SVG LINE CHART --- */}
         <div style={{position:'relative', height:'150px', width:'100%', padding:'10px 10px 20px 10px', boxSizing:'border-box'}}>
            
            <svg viewBox={`0 0 ${graphWidth} ${graphHeight}`} style={{width:'100%', height:'100%', overflow:'visible'}}>
                
                {/* 1. The Connecting Line */}
                <polyline 
                    fill="none"
                    stroke="#a7f3d0" // Light green line
                    strokeWidth="3"
                    points={polylinePoints}
                />

                {/* 2. The Points (Dots) */}
                {points.map((p, i) => (
                    <circle 
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="5"
                        fill="#10b981" // Dark green dot
                        stroke="white"
                        strokeWidth="2"
                    />
                ))}

                {/* 3. The Labels (Text below dots) */}
                {points.map((p, i) => (
                    <text 
                        key={i} 
                        x={p.x} 
                        y={graphHeight + 20} 
                        textAnchor="middle" 
                        fill="#6b7280" 
                        fontSize="10" // SVG font size
                        fontWeight="500"
                    >
                        {p.label}
                    </text>
                ))}
            </svg>

         </div>
         
         <div style={{textAlign:'center', marginTop:'5px', fontSize:'13px', color:'#6b7280'}}>
            {totalLabel}: <span style={{color:'#1f2937', fontWeight:'700', fontSize:'18px'}}>₹{currentTotal.toLocaleString()}</span>
         </div>
      </div>

      <h4 style={{marginBottom:'12px', color:'#4b5563', fontSize:'15px'}}>Recent Transactions</h4>
      
      {transactions.map(txn => (
        <div key={txn.id} className="card" style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'16px'}}>
            <div style={{display:'flex', alignItems:'center', gap:'15px'}}>
                <div style={{
                    background: txn.type === 'credit' ? '#ecfdf5' : txn.type === 'pending' ? '#fff7ed' : '#fee2e2', 
                    padding:'10px', borderRadius:'50%'
                }}>
                    {txn.type === 'credit' ? <ArrowDownLeft size={20} color="#10b981"/> : 
                     txn.type === 'pending' ? <AlertCircle size={20} color="#ea580c"/> :
                     <ArrowUpRight size={20} color="#ef4444"/>}
                </div>
                <div>
                    <div style={{fontWeight:'600', fontSize:'14px', marginBottom:'2px'}}>{txn.title}</div>
                    <div style={{color:'#9ca3af', fontSize:'12px'}}>{txn.time}</div>
                </div>
            </div>
            <div style={{fontWeight:'700', fontSize:'15px', color: txn.type === 'credit' ? '#10b981' : '#1f2937'}}>
                {txn.amount}
            </div>
        </div>
      ))}
    </div>
  );
}

export default Wallet;