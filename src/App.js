import React from 'react';
import { Routes, Route } from 'react-router-dom'; // No need to import BrowserRouter here
import LoginPage from './components/LoginPage';
import HomePage from './components/homepage/HomePage';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
