import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ManifestPage.module.css';
import { dashboardApi } from '../../services/dashboardApi';
import PassengerListItem from '../../components/Driver/PassengerListItem';
import { Bus, Navigation, Users, ChevronLeft, AlertCircle, Play, ArrowRight } from 'lucide-react';

const ManifestPage = () => {
  const [manifest, setManifest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tripStarted, setTripStarted] = useState(false);
  const [tripId] = useState('101');

  useEffect(() => {
    const fetchManifest = async () => {
      try {
        const data = await dashboardApi.getDriverManifest(tripId);
        setManifest(data);
      } catch (error) {
        console.error("Failed to fetch manifest", error);
      } finally {
        setLoading(false);
      }
    };

    fetchManifest();
  }, [tripId]);

  const handleStartTrip = async () => {
    if (window.confirm("Are you sure you want to start this trip now?")) {
      try {
        await dashboardApi.startTrip(tripId);
        setTripStarted(true);
        alert("Trip started successfully! Drive safe.");
      } catch (error) {
        alert("Failed to start trip. Please try again.");
      }
    }
  };

  const confirmedCount = manifest.filter(p => p.status === 'CONFIRMED' || p.status === 'CHECKED_IN').length;
  const totalCount = manifest.length;

  if (loading) {
    return (
      <div className={styles.loading}>
        <Bus className={styles.busIcon} />
        <p>Fetching Passenger Data...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.topBar}>
          <Link to="/driver/dashboard" className={styles.backBtn}>
            <ChevronLeft size={20} />
            <span>Dashboard</span>
          </Link>
          <div className={styles.tripBadge}>Trip ID: #{tripId}</div>
        </div>
        
        <div className={`glass-card ${styles.hero}`}>
           <div className={styles.route}>
              <div>
                 <p className={styles.label}>Departure</p>
                 <h2 className={styles.city}>Coimbatore</h2>
              </div>
              <div className={styles.divider}>
                 <ArrowRight size={32} className={styles.navIcon} />
              </div>
              <div className={styles.destination}>
                 <p className={styles.label}>Arrival</p>
                 <h2 className={styles.city}>Chennai</h2>
              </div>
           </div>
           
           <div className={styles.stats}>
              <Users size={20} />
              <span>{confirmedCount} / {totalCount} Passengers Confirmed</span>
           </div>
        </div>
      </header>

      <main className={styles.content}>
        <div className={styles.listHeader}>
          <h3 className={styles.listTitle}>Passenger Manifest</h3>
          <span className={styles.countBadge}>{manifest.length} Passengers</span>
        </div>

        <div className={styles.list}>
          {manifest.map((passenger) => (
            <PassengerListItem key={passenger.bookingId} passenger={passenger} />
          ))}
        </div>
        
        {manifest.length === 0 && (
           <div className={`glass-card ${styles.empty}`}>
              <AlertCircle size={48} color="var(--primary)" />
              <p>No passengers found for this trip.</p>
           </div>
        )}
      </main>

      <footer className={styles.footer}>
        <button 
          className={`${styles.startBtn} ${tripStarted ? styles.started : ''}`}
          onClick={handleStartTrip}
          disabled={tripStarted}
        >
          {tripStarted ? (
            <>
              <Navigation size={22} />
              <span>Trip In Progress</span>
            </>
          ) : (
            <>
              <Play size={22} fill="currentColor" />
              <span>Initiate Trip</span>
            </>
          )}
        </button>
      </footer>
    </div>
  );
};

export default ManifestPage;
