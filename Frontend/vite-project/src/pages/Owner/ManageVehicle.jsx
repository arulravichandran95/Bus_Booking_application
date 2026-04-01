import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Wrench, ShieldCheck, MapPin, User, Save } from 'lucide-react';
import styles from './ManageVehicle.module.css';

const ManageVehicle = () => {
  const { id } = useParams();
  
  // Simulated initial state based on ID
  const [vehicle, setVehicle] = useState({
    id: id || "BUS-001",
    name: "Superliner Express",
    plate: "CB-42-BT-1234",
    status: "On Route",
    driver: "Arjun Kumar",
    location: "Salem Bypass",
    fuel: "75%",
    nextService: "May 15, 2026"
  });

  const [editMode, setEditMode] = useState(false);

  // Status Colors styling
  const getStatusColor = (status) => {
    switch (status) {
      case 'On Route': return '#22c55e';
      case 'Idle': return '#3b82f6';
      case 'In Maintenance': return '#ef4444';
      default: return 'var(--text-muted)';
    }
  };

  const handleStatusChange = (newStatus) => {
    setVehicle(prev => ({ ...prev, status: newStatus }));
  };

  const handleSave = () => {
    setEditMode(false);
    alert(`Vehicle ${vehicle.id} details updated locally!`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/owner/fleet" className={styles.backBtn}>
            <ChevronLeft size={20} />
            <span>Back to Fleet</span>
          </Link>
          <div className={styles.titleArea}>
            <h1>Manage Vehicle</h1>
            <p>Tracking and modification suite for {vehicle.name}</p>
          </div>
        </div>
      </header>

      <main className={styles.mainContent}>
        
        {/* Top Status & Quick Mod Card */}
        <section className={`glass-card ${styles.statusCard}`}>
           <div className={styles.statusHeader}>
              <div className={styles.busIdWrapper}>
                <h2>{vehicle.name}</h2>
                <span className={styles.plate}>{vehicle.plate}</span>
              </div>
              <div className={styles.statusPill}>
                 <span className={styles.dot} style={{ background: getStatusColor(vehicle.status) }}></span>
                 {vehicle.status}
              </div>
           </div>

           <div className={styles.quickActions}>
              <p className={styles.label}>Quick Status Override</p>
              <div className={styles.actionButtons}>
                 <button 
                  className={styles.statusBtn} 
                  onClick={() => handleStatusChange('On Route')}
                  disabled={vehicle.status === 'On Route'}
                 >
                   Deploy Route
                 </button>
                 <button 
                  className={styles.statusBtn} 
                  onClick={() => handleStatusChange('Idle')}
                  disabled={vehicle.status === 'Idle'}
                 >
                   Set Idle
                 </button>
                 <button 
                  className={`${styles.statusBtn} ${styles.danger}`} 
                  onClick={() => handleStatusChange('In Maintenance')}
                  disabled={vehicle.status === 'In Maintenance'}
                 >
                   <Wrench size={16} /> Send to Maintenance
                 </button>
              </div>
           </div>
        </section>

        {/* Detailed Configuration */}
        <div className={styles.configGrid}>
            <section className={`glass-card ${styles.configCard}`}>
               <h3><User className={styles.icon} size={20} /> Crew Assignment</h3>
               <div className={styles.configItem}>
                  <label>Primary Driver</label>
                  {editMode ? (
                     <input 
                      type="text" 
                      value={vehicle.driver} 
                      className={styles.input}
                      onChange={(e) => setVehicle({...vehicle, driver: e.target.value})}
                     />
                  ) : (
                     <p className={styles.value}>{vehicle.driver}</p>
                  )}
               </div>
               
               <div className={styles.configItem}>
                  <label>Current Location Signal</label>
                  <p className={styles.value} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <MapPin size={16} color="var(--primary)"/> {vehicle.location}
                  </p>
               </div>
            </section>

            <section className={`glass-card ${styles.configCard}`}>
               <h3><ShieldCheck className={styles.icon} size={20} /> Telemetry & Service</h3>
               <div className={styles.configItem}>
                  <label>Fuel Level</label>
                  <div className={styles.fuelBar}>
                     <div 
                        className={styles.fuelFill} 
                        style={{ width: vehicle.fuel, backgroundColor: parseInt(vehicle.fuel) < 30 ? '#ef4444' : 'var(--success)' }}
                     />
                     <span>{vehicle.fuel}</span>
                  </div>
               </div>
               <div className={styles.configItem}>
                  <label>Next Scheduled Service</label>
                  <p className={styles.value}>{vehicle.nextService}</p>
               </div>
            </section>
        </div>

        <div className={styles.saveContainer}>
           {editMode ? (
              <button className="btn-primary" onClick={handleSave} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                 <Save size={18} /> Update Data
              </button>
           ) : (
              <button className={styles.secondaryBtn} onClick={() => setEditMode(true)}>
                 Edit Vehicle Details
              </button>
           )}
        </div>

      </main>
    </div>
  );
};

export default ManageVehicle;
