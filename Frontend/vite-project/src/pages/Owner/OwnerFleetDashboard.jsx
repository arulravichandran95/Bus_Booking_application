import React from 'react';
import { Link } from 'react-router-dom';
import styles from './OwnerFleetDashboard.module.css';
import { Bus, User, MapPin, Settings, ChevronLeft, Search, PlusCircle, MoreVertical, UserPlus } from 'lucide-react';

const OwnerFleetDashboard = () => {
  const fleetData = [
    {
      id: "BUS-001",
      name: "Superliner Express",
      plate: "CB-42-BT-1234",
      driver: "Arjun Kumar",
      status: "On Route",
      location: "Salem Bypass",
      fuel: "75%",
      nextService: "May 15, 2026"
    },
    {
      id: "BUS-002",
      name: "Star Cruiser",
      plate: "TN-38-AX-5678",
      driver: "Senthil Raj",
      status: "Idle",
      location: "Coimbatore Depot",
      fuel: "90%",
      nextService: "June 2, 2026"
    },
    {
      id: "BUS-003",
      name: "Rapid Transit",
      plate: "TN-01-PK-9012",
      driver: "Deepak Singh",
      status: "In Maintenance",
      location: "Main Service Hub",
      fuel: "20%",
      nextService: "In Progress"
    },
    {
      id: "BUS-004",
      name: "Coastal Voyager",
      plate: "CH-22-MM-3456",
      driver: "Ramesh Babu",
      status: "On Route",
      location: "Chennai City",
      fuel: "45%",
      nextService: "June 10, 2026"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'On Route': return '#22c55e';
      case 'Idle': return '#3b82f6';
      case 'In Maintenance': return '#ef4444';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link to="/owner" className={styles.backBtn}>
            <ChevronLeft size={20} />
            <span>Analytics</span>
          </Link>
          <div className={styles.titleArea}>
            <h1>Fleet Management</h1>
            <p>Manage your buses and driver assignments</p>
          </div>
        </div>
        
        <div className={styles.actions}>
           <div className={styles.searchBar}>
              <Search size={18} />
              <input type="text" placeholder="Search fleet..." />
           </div>
          <Link to="/owner/fleet/add-driver" className={styles.addBtn} style={{ background: 'var(--surface)', color: 'var(--primary)', border: '1px solid var(--primary)' }}>
              <UserPlus size={20} />
              <span>Add Driver</span>
           </Link>
           <Link to="/owner/fleet/add" className={styles.addBtn}>
              <PlusCircle size={20} />
              <span>Add Vehicle</span>
           </Link>
        </div>
      </header>

      <section className={styles.fleetGrid}>
        {fleetData.map((bus) => (
          <div key={bus.id} className={`glass-card ${styles.busCard}`}>
            <div className={styles.busHeader}>
              <div className={styles.busInfo}>
                <div className={styles.busIconWrapper}>
                   <Bus size={24} />
                </div>
                <div>
                   <h3>{bus.name}</h3>
                   <span className={styles.plate}>{bus.plate}</span>
                </div>
              </div>
              <button className={styles.moreBtn}>
                <MoreVertical size={20} />
              </button>
            </div>

            <div className={styles.detailsList}>
               <div className={styles.detailItem}>
                  <User size={16} />
                  <div className={styles.detailContent}>
                     <span className={styles.label}>Assigned Driver</span>
                     <span className={styles.value}>{bus.driver}</span>
                  </div>
               </div>
               <div className={styles.detailItem}>
                  <MapPin size={16} />
                  <div className={styles.detailContent}>
                     <span className={styles.label}>Current Location</span>
                     <span className={styles.value}>{bus.location}</span>
                  </div>
               </div>
            </div>

            <div className={styles.footer}>
               <div className={styles.status}>
                  <span 
                    className={styles.statusDot} 
                    style={{ backgroundColor: getStatusColor(bus.status) }}
                  />
                  <span>{bus.status}</span>
               </div>
               <div className={styles.fuel}>
                  <span className={styles.fuelLabel}>Fuel</span>
                  <div className={styles.fuelBar}>
                     <div 
                        className={styles.fuelFill} 
                        style={{ width: bus.fuel, backgroundColor: parseInt(bus.fuel) < 30 ? '#ef4444' : 'var(--primary)' }}
                     />
                  </div>
                  <span className={styles.fuelValue}>{bus.fuel}</span>
               </div>
            </div>
            
            <div className={styles.cardActions}>
               <button className={styles.secondaryAction}>Track</button>
               <Link to={`/owner/fleet/manage/${bus.id}`} className={styles.primaryAction} style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>Manage Details</Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default OwnerFleetDashboard;
