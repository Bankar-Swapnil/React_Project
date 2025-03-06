import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ProductDetails from './pages/ProductDetails';
import CompareProducts from './pages/CompareProducts';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px',background:'#e7e7e7' }}>
          <Routes>
            <Route path="/" element={<ProductDetails />} />
            <Route path="/compare" element={<CompareProducts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
