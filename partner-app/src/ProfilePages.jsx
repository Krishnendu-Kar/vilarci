import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle, Camera } from 'lucide-react';
import './App.css';

// --- SHARED HEADER COMPONENT ---
const SubHeader = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="sub-header">
      <ArrowLeft size={24} onClick={() => navigate(-1)} style={{cursor:'pointer'}} />
      <h2>{title}</h2>
    </div>
  );
};

// --- 1. PERSONAL DETAILS PAGE (NOW SAVES DATA) ---
export const PersonalDetails = () => {
  const navigate = useNavigate();
  
  // 1. STATE FOR FORM DATA
  const [formData, setFormData] = useState({
    name: 'Amit Roy',
    email: 'amit.roy@gmail.com',
    address: '12/A, Block B, Sector 5, Salt Lake, Kolkata - 700091',
    mobile: '+91 98765 43210' // Keep mobile separate as it's often read-only
  });

  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  // 2. LOAD SAVED DATA ON START
  useEffect(() => {
    // Load Image
    const savedImage = localStorage.getItem('userProfilePic');
    if (savedImage) setProfileImage(savedImage);

    // Load Text Data
    const savedData = localStorage.getItem('userProfileData');
    if (savedData) {
        setFormData(JSON.parse(savedData));
    }
  }, []);

  // 3. HANDLE TEXT CHANGES
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 4. HANDLE IMAGE UPLOAD
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        localStorage.setItem('userProfilePic', reader.result); // Save image immediately
      };
      reader.readAsDataURL(file);
    }
  };

  // 5. SAVE CHANGES FUNCTION
  const handleSaveChanges = () => {
    // Save the object to LocalStorage
    localStorage.setItem('userProfileData', JSON.stringify(formData));
    
    // Show feedback and go back
    alert("Profile Updated Successfully!");
    navigate('/profile'); // Go back to main profile to see changes
  };

  return (
    <div className="page-container" style={{padding: 0, background:'#f3f4f6', minHeight:'100vh'}}>
      <SubHeader title="Personal Details" />
      
      <div className="form-section">
        {/* IMAGE UPLOAD SECTION */}
        <input type="file" accept="image/*" ref={fileInputRef} style={{display: 'none'}} onChange={handleImageUpload} />

        <div style={{display:'flex', justifyContent:'center', marginBottom:'20px'}}>
           <div 
              onClick={() => fileInputRef.current.click()} 
              style={{
                width:'110px', height:'110px', 
                borderRadius:'50%', position:'relative', cursor: 'pointer',
                border: '4px solid white', boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                background: '#e0e7ff', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
           >
              {profileImage ? (
                  <img src={profileImage} alt="Profile" style={{width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover'}} />
              ) : (
                  <span style={{color:'#3730a3', fontSize:'28px', fontWeight:'bold'}}>VR</span>
              )}
              <div style={{position:'absolute', bottom:0, right:0, background:'#fdaa86', padding:'8px', borderRadius:'50%', border:'3px solid white', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <Camera size={18} color="white"/>
              </div>
           </div>
        </div>
        
        {/* FORM INPUTS (Added name, value, onChange) */}
        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input 
            type="text" 
            name="name"
            className="input-field" 
            value={formData.name} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Mobile Number</label>
          <input 
            type="text" 
            className="input-field locked" 
            value={formData.mobile} 
            readOnly 
          />
          <span style={{fontSize:'11px', color:'#ef4444', marginTop:'4px', display:'block'}}>Cannot be changed</span>
        </div>

        <div className="form-group">
          <label className="form-label">Email Address</label>
          <input 
            type="email" 
            name="email"
            className="input-field" 
            value={formData.email} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="form-group">
          <label className="form-label">Current Address</label>
          <textarea 
            name="address"
            className="input-field" 
            rows="3" 
            value={formData.address} 
            onChange={handleInputChange} 
          />
        </div>
      </div>

      {/* SAVE BUTTON */}
      <div style={{padding:'20px'}}>
        <button className="btn-primary" onClick={handleSaveChanges}>Save Changes</button>
      </div>
    </div>
  );
};

// ... (Keep VehicleDetails, Documents, SettingsPage exactly as they were) ...
// --- 2. VEHICLE INFO PAGE ---
export const VehicleDetails = () => {
  return (
    <div className="page-container" style={{padding: 0, background:'#f3f4f6', minHeight:'100vh'}}>
      <SubHeader title="Vehicle Information" />
      <div className="form-section">
        <div className="form-group">
          <label className="form-label">Vehicle Type</label>
          <div style={{display:'flex', gap:'10px'}}>
             <div style={{padding:'10px 20px', background:'#fff0ef', border:'1px solid #eb2525', color:'#ff857a', borderRadius:'8px', fontWeight:'600', fontSize:'14px'}}>Motorcycle</div>
          </div>
        </div>
        <div className="form-group"><label className="form-label">Vehicle Number</label><input type="text" className="input-field" defaultValue="WB-20-X-1234" /></div>
        <div className="form-group"><label className="form-label">Model</label><input type="text" className="input-field" defaultValue="Honda Shine 125" /></div>
        <div className="form-group"><label className="form-label">Pollution Expiry</label><input type="date" className="input-field" defaultValue="2025-12-12" /></div>
      </div>
    </div>
  );
};
// --- 3. DOCUMENTS PAGE ---
export const Documents = () => {
    return (
        <div className="page-container" style={{padding: 0, background:'#f3f4f6', minHeight:'100vh'}}>
          <SubHeader title="My Documents" />
          <div className="menu-card" style={{margin:'16px', borderRadius:'12px'}}>
             <div style={{padding:'16px'}}>
                <DocumentItem title="Driving License" status="Verified" date="Exp: 2028" />
                <DocumentItem title="Aadhar Card" status="Verified" />
                <DocumentItem title="Vehicle RC" status="Verified" />
                <DocumentItem title="Vehicle Insurance" status="Expiring Soon" isWarning />
             </div>
          </div>
        </div>
      );
};
const DocumentItem = ({ title, status, date, isWarning }) => (
    <div className="doc-item">
        <div className="doc-info"><h4>{title}</h4><p>{date || "Uploaded on 12 Jan 2025"}</p></div>
        <div style={{textAlign:'right'}}><span className={`badge ${isWarning ? 'pending' : 'delivered'}`}>{status}</span></div>
    </div>
);
// --- 4. SETTINGS PAGE ---
export const SettingsPage = () => {
    return (
        <div className="page-container" style={{padding: 0, background:'#f3f4f6', minHeight:'100vh'}}>
          <SubHeader title="Preferences" />
          <div className="menu-card" style={{margin:'16px', borderRadius:'12px', padding:'16px'}}>
             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
                <div><h4 style={{margin:0}}>Accept Auto-Assignment</h4><p style={{margin:0, color:'#6b7280', fontSize:'12px'}}>Orders will be accepted automatically</p></div>
                <label className="switch"><input type="checkbox" defaultChecked /><span className="slider round"></span></label>
             </div>
             <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
                <div><h4 style={{margin:0}}>Navigation Voice</h4><p style={{margin:0, color:'#6b7280', fontSize:'12px'}}>Speak directions during ride</p></div>
                <label className="switch"><input type="checkbox" /><span className="slider round"></span></label>
             </div>
          </div>
        </div>
      );
};