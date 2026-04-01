import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import SearchPage from './pages/Passenger/SearchPage';
import SeatMapPage from './pages/Passenger/SeatMapPage';
import TicketConfirmationPage from './pages/Passenger/TicketConformationPage';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="appContainer">
        <nav className="navbar">
          <Link to="/" className="brand">
            🚌 <span>BusSync</span>
          </Link>
          <div className="navLinks">
            <Link to="/passenger/search" className="navLink">Book Tickets</Link>
            <span style={{color: 'var(--border)'}}>|</span>
            <Link to="/" className="navLink" onClick={() => localStorage.removeItem('token')}>Sign Out</Link>
          </div>
        </nav>
        
        <main className="mainContent">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/passenger/search" element={<SearchPage />} />
            <Route path="/passenger/seat/:tripId" element={<SeatMapPage />} />
            <Route path="/passenger/confirm" element={<TicketConfirmationPage />} />
            {/* Redirect unknown routes to Login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
