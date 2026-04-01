import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';

// Passenger Pages
import Login from './pages/Login';
import SearchPage from './pages/Passenger/SearchPage';
import SeatMapPage from './pages/Passenger/SeatMapPage';
import TicketConfirmationPage from './pages/Passenger/TicketConformationPage';

// Owner Pages
import AnalyticsDashboard from './pages/Owner/AnalyticsDashboard';
import OwnerFleetDashboard from './pages/Owner/OwnerFleetDashboard';
import AddVehicle from './pages/Owner/AddVehicle';
import ManageVehicle from './pages/Owner/ManageVehicle';
import AddDriver from './pages/Owner/AddDriver';

// Driver Pages
import ManifestPage from './pages/Driver/ManifestPage';
import DriverDashboard from './pages/Driver/DriverDashboard';

import { Bell } from 'lucide-react';
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
            
            <div className="notificationWrapper">
              <Bell size={20} className="bellIcon" />
              <span className="notificationDot"></span>
            </div>

            <span style={{color: 'var(--border)'}}>|</span>
            <Link to="/" className="navLink" onClick={() => localStorage.removeItem('token')}>Sign Out</Link>
          </div>
        </nav>
        
        <main className="mainContent">
          <Routes>
            {/* Core & Passenger Routes */}
            <Route path="/" element={<Login />} />
            <Route path="/passenger/search" element={<SearchPage />} />
            <Route path="/passenger/seat/:tripId" element={<SeatMapPage />} />
            <Route path="/passenger/confirm" element={<TicketConfirmationPage />} />

            {/* Owner Routes */}
            <Route path="/owner/dashboard" element={<AnalyticsDashboard />} />
            <Route path="/owner/fleet" element={<OwnerFleetDashboard />} />
            <Route path="/owner/fleet/add" element={<AddVehicle />} />
            <Route path="/owner/fleet/add-driver" element={<AddDriver />} />
            <Route path="/owner/fleet/manage/:id" element={<ManageVehicle />} />

            {/* Driver Routes */}
            <Route path="/driver/dashboard" element={<DriverDashboard />} />
            <Route path="/driver/manifest/:tripId" element={<ManifestPage />} />
            
            {/* Redirect unknown routes to Login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
