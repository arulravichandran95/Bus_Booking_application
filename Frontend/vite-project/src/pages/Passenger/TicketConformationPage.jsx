import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { passengerApi } from '../../services/passengerApi';
import styles from './Confirmation.module.css';

const TicketConfirmationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [tripStatus, setTripStatus] = useState('SCHEDULED');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!state?.lockId) {
      // Fallback if accessed directly
      navigate('/passenger/search');
      return;
    }

    const confirm = async () => {
      try {
        const res = await passengerApi.confirmBooking(state.lockId, { name: "User", phone: "123" });
        setBooking(res.data);
      } catch (err) {
        console.error("API Error: Confirmation failed", err);
      } finally {
        setLoading(false);
      }
    };
    confirm();
  }, [state, navigate]);

  useEffect(() => {
    if (!state?.tripId) return;
    
    const checkStatus = async () => {
      try {
        const res = await passengerApi.getTripStatus(state.tripId);
        if (res.data.status === 'IN_PROGRESS' && tripStatus !== 'IN_PROGRESS') {
          if ("Notification" in window && Notification.permission === "granted") {
            new Notification("🚍 Your driver has started the trip!");
          }
        }
        setTripStatus(res.data.status);
      } catch (e) {
        // Silent catch for demo
      }
    };

    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [state?.tripId, tripStatus]);

  if (loading || !booking) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <h2>Confirming your booking...</h2>
        <p>Please don't close this page.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.ticketWrapper}>
        <div className={styles.ticketHeader}>
          <div className={styles.successIcon}>✓</div>
          <h2>Booking Confirmed!</h2>
          <p>Your journey is secured.</p>
        </div>

        <div className={styles.ticketBody}>
          <div className={styles.ticketInfo}>
            <div className={styles.infoGroup}>
              <label>Booking ID</label>
              <strong>{booking.bookingId}</strong>
            </div>
            <div className={styles.infoGroup}>
              <label>Trip Status</label>
              <div className={`${styles.statusBadge} ${styles[tripStatus.toLowerCase()]}`}>
                <span className={styles.pulse}></span>
                {tripStatus.replace('_', ' ')}
              </div>
            </div>
          </div>
          
          <div className={styles.divider}>
            <div className={styles.notchLeft}></div>
            <div className={styles.dashedLine}></div>
            <div className={styles.notchRight}></div>
          </div>

          <div className={styles.qrSection}>
            <p>Scan to board the bus</p>
            <div className={styles.qrBox}>
              <div className={styles.qrPlaceholder}>
                {/* Fallback pattern if qrCode base64 is a transparent pixel like our mock */}
                <div className={styles.qrPattern}></div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.actions}>
          <button className="btn-primary" onClick={() => window.print()}>
            Download PDF
          </button>
          <button className={styles.btnSecondary} onClick={() => navigate('/passenger/search')}>
            Book Another Trip
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketConfirmationPage;