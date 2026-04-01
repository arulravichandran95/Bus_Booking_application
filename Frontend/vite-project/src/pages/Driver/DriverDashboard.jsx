import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DriverDashboard.module.css';

const DriverDashboard = () => {
  // Mock data for the dashboard
  const driverName = "John Doe";
  const currentTrip = {
    id: "TRIP-1024",
    route: "Downtown ↔ North Station",
    status: "Active",
    departure: "12:30 PM",
    passengers: 24,
    capacity: 45
  };

  const stats = [
    { label: "Today's Trips", value: "4", icon: "🛣️" },
    { label: "Total Passengers", value: "156", icon: "👥" },
    { label: "Rating", value: "4.9", icon: "⭐" },
    { label: "Hours Logged", value: "6.5h", icon: "⏱️" }
  ];

  const schedule = [
    { time: "02:00 PM", trip: "North Station ↔ Airport", status: "Upcoming" },
    { time: "04:30 PM", trip: "Airport ↔ Downtown", status: "Upcoming" },
    { time: "07:00 PM", trip: "Downtown ↔ North Station", status: "Upcoming" }
  ];

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.welcome}>
          <h1>Welcome back, {driverName}</h1>
          <p>You have 3 upcoming trips today.</p>
        </div>
        <div className={styles.date}>
          April 1, 2026
        </div>
      </header>

      <section className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} className={`glass-card ${styles.statCard}`}>
            <span className={styles.statIcon}>{stat.icon}</span>
            <div className={stat.statInfo}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </div>
          </div>
        ))}
      </section>

      <div className={styles.mainGrid}>
        <section className={`glass-card ${styles.currentTrip}`}>
          <div className={styles.cardHeader}>
            <h2>Current Trip</h2>
            <span className={styles.statusBadge}>{currentTrip.status}</span>
          </div>
          <div className={styles.tripDetails}>
            <div className={styles.routeInfo}>
              <span className={styles.routeId}>{currentTrip.id}</span>
              <span className={styles.routeName}>{currentTrip.route}</span>
            </div>
            <div className={styles.tripStats}>
              <div className={styles.tripStat}>
                <span className={styles.label}>Departure</span>
                <span className={styles.value}>{currentTrip.departure}</span>
              </div>
              <div className={styles.tripStat}>
                <span className={styles.label}>Passengers</span>
                <span className={styles.value}>{currentTrip.passengers} / {currentTrip.capacity}</span>
              </div>
            </div>
            <div className={styles.actions}>
              <Link to="/driver" className={styles.primaryAction}>
                View Passenger Manifest
              </Link>
              <button className={styles.secondaryAction}>
                Update Status
              </button>
            </div>
          </div>
        </section>

        <section className={`glass-card ${styles.scheduleSection}`}>
          <h2>Upcoming Schedule</h2>
          <div className={styles.scheduleList}>
            {schedule.map((item, index) => (
              <div key={index} className={styles.scheduleItem}>
                <span className={styles.itemTime}>{item.time}</span>
                <div className={styles.itemContent}>
                  <span className={styles.itemTrip}>{item.trip}</span>
                  <span className={styles.itemStatus}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DriverDashboard;
