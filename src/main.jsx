import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider.jsx';
import { Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById("root")).render(
 
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes> 
      </BrowserRouter>
    </AuthProvider>

);
