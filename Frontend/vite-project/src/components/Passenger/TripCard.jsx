import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './TripCard.module.css';

const TripCard = ({ trip }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.busInfo}>
          <h3>{trip.busName || `Trip #${trip.tripId}`}</h3>
          <span className={styles.typeBadge}>{trip.type || 'A/C Sleeper'}</span>
        </div>
        <div className={styles.priceContainer}>
          <span className={styles.price}>₹{trip.price || '850'}</span>
          <span className={styles.priceLabel}>per seat</span>
        </div>
      </div>
      
      <div className={styles.body}>
        <div className={styles.timeInfo}>
          <div className={styles.timeBlock}>
            <span className={styles.time}>{trip.departureTime || '22:00'}</span>
            <span className={styles.location}>{trip.source || 'CBE'}</span>
          </div>
          
          <div className={styles.duration}>
            <span className={styles.durationText}>{trip.duration || '8h 30m'}</span>
            <div className={styles.line}>
              <div className={styles.dot}></div>
              <div className={styles.path}></div>
              <div className={styles.dot}></div>
            </div>
            <span className={styles.stopsText}>Non-stop</span>
          </div>
          
          <div className={styles.timeBlock}>
            <span className={styles.time}>{trip.arrivalTime || '06:30'}</span>
            <span className={styles.location}>{trip.destination || 'Chennai'}</span>
          </div>
        </div>
      </div>
      
      <div className={styles.footer}>
        <div className={styles.availability}>
          <span className={`${styles.statusDot} ${trip.seatsAvailable < 10 ? styles.fewSeats : styles.available}`}></span>
          <span>{trip.seatsAvailable || 24} Seats Left</span>
        </div>
        <button 
          className="btn-primary"
          onClick={() => navigate(`/passenger/seat/${trip.tripId}`)}
        >
          View Seats
        </button>
      </div>
    </div>
  );
};

export default TripCard;
