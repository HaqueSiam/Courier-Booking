// === File: src/main.jsx ===
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { AuthProvider } from './context/AuthContext'; // import AuthProvider

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* Add AuthProvider here */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
