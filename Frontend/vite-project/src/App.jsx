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
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import AnalyticsDashboard from './pages/Owner/AnalyticsDashboard'
import OwnerFleetDashboard from './pages/Owner/OwnerFleetDashboard'
import ManifestPage from './pages/Driver/ManifestPage'
import DriverDashboard from './pages/Driver/DriverDashboard'
import './App.css'

function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>BusSync</h1>
        <p className="hero-subtitle">The ultimate fleet management and booking solution for modern transporters.</p>
        
        <div className="action-cards">
          <Link to="/owner" className="glass-card nav-card">
            <div className="icon">📊</div>
            <h3>Owner Analytics</h3>
            <p>Access real-time analytics, revenue reports, and fleet insights.</p>
            <span className="btn-text">View Analytics →</span>
          </Link>

          <Link to="/owner/fleet" className="glass-card nav-card">
            <div className="icon">🚍</div>
            <h3>Fleet Management</h3>
            <p>Monitor bus locations, driver details, and vehicle status.</p>
            <span className="btn-text">Manage Fleet →</span>
          </Link>
          
          <Link to="/driver/dashboard" className="glass-card nav-card">
            <div className="icon">🚌</div>
            <h3>Driver Portal</h3>
            <p>Manage your trips, view passenger manifests, and track your schedule.</p>
            <span className="btn-text">Enter Dashboard →</span>
          </Link>
        </div>
      </header>

      <footer className="home-footer">
        <p>&copy; 2026 BusSync Technologies. All rights reserved.</p>
      </footer>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/owner" element={<AnalyticsDashboard />} />
        <Route path="/owner/fleet" element={<OwnerFleetDashboard />} />
        <Route path="/driver" element={<ManifestPage />} />
        <Route path="/driver/dashboard" element={<DriverDashboard />} />
      </Routes>
    </Router>
  )
}

export default App;
