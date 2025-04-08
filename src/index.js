import React from 'react';
import ReactDOM from 'react-dom/client';  // Update this line
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Use createRoot instead of render
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
