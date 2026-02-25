import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Import Components
import Navbar from './Navbar';
import Sidebar from './Sidebar'; // <--- Added Import
import Home from './Home';
import ProductDetails from './ProductDetails';
import Services from './Services';

// Simple Placeholder for new pages
const PagePlaceholder = ({ title }) => (
  <div className="pt-40 text-center font-bold text-xl">{title} Page Coming Soon</div>
);

function App() {
  const [cart, setCart] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // <--- Added State

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart') || "[]");
    setCart(savedCart);
  }, []);

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  return (
    <Router>
      <div className="font-sans text-gray-900 bg-gray-50 min-h-screen">
        
        {/* 1. Navbar with Toggle Function */}
        <Navbar 
          cartCount={cart.length} 
          toggleSidebar={() => setIsSidebarOpen(true)} 
        />

        {/* 2. Sidebar Component (Hidden by default) */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* 3. Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:slug" element={<ProductDetails addToCart={addToCart} />} />
          <Route path="/services" element={<Services />} />
                    
          <Route path="/category/:id" element={<PagePlaceholder title="Product List" />} />
          <Route path="/service-list/:id" element={<PagePlaceholder title="Service List" />} />
          
          {/* New Pages from Sidebar */}
          <Route path="/travels" element={<PagePlaceholder title="Travels" />} />
          <Route path="/wishlist" element={<PagePlaceholder title="My Wishlist" />} />
          <Route path="/orders" element={<PagePlaceholder title="My Orders" />} />
          <Route path="/wallet" element={<PagePlaceholder title="My Wallet" />} />
          <Route path="/lucky-winners" element={<PagePlaceholder title="Lucky Winners" />} />
          <Route path="/tutorial-video" element={<PagePlaceholder title="Tutorial Video" />} />
          <Route path="/seller-home" element={<PagePlaceholder title="Become a Seller" />} />
          <Route path="/about-us" element={<PagePlaceholder title="About Us" />} />
        </Routes>
        
        <ToastContainer position="bottom-center" theme="dark" />
      </div>
    </Router>
  );
}

export default App;