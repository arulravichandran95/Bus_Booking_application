import React from 'react';
import { Calendar, Clock, MapPin, QrCode, XCircle } from 'lucide-react';
import styles from './BookingCard.module.css';

const BookingCard = ({ booking, onCancel }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'CONFIRMED': return styles.confirmed;
      case 'COMPLETED': return styles.completed;
      case 'CANCELLED': return styles.cancelled;
      default: return '';
    }
  };

  return (
    <div className={`glass-card ${styles.card}`}>
      <div className={styles.header}>
        <span className={styles.bookingId}>{booking.bookingId}</span>
        <span className={`${styles.statusBadge} ${getStatusClass(booking.status)}`}>
          {booking.status}
        </span>
      </div>

      <div className={styles.routeHeader}>
        <div className={styles.routePart}>
          <span className={styles.label}>From</span>
          <h3 className={styles.city}>{booking.source}</h3>
        </div>
        <div className={styles.routeIcon}>
          <div className={styles.dottedLine}></div>
          <span className={styles.busIcon}>🚌</span>
          <div className={styles.dottedLine}></div>
        </div>
        <div className={styles.routePart}>
          <span className={styles.label}>To</span>
          <h3 className={styles.city}>{booking.destination}</h3>
        </div>
      </div>

      <div className={styles.detailsGrid}>
        <div className={styles.detailItem}>
           <Calendar size={16} />
           <div>
              <p className={styles.label}>Date</p>
              <p className={styles.value}>{new Date(booking.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric'})}</p>
           </div>
        </div>
        <div className={styles.detailItem}>
           <Clock size={16} />
           <div>
              <p className={styles.label}>Departure</p>
              <p className={styles.value}>{booking.departureTime}</p>
           </div>
        </div>
        <div className={styles.detailItem}>
           <MapPin size={16} />
           <div>
              <p className={styles.label}>Seat(s)</p>
              <p className={styles.value}>{booking.seats}</p>
           </div>
        </div>
      </div>

      <div className={styles.footer}>
         <div className={styles.busInfo}>
            <p className={styles.busName}>{booking.busName}</p>
            <p className={styles.price}>₹{booking.amount}</p>
         </div>
         {booking.status === 'CONFIRMED' && (
            <div className={styles.actions}>
              <button className={styles.qrBtn}>
                <QrCode size={18} />
                e-Ticket
              </button>
              <button 
                className={styles.cancelBtn} 
                onClick={() => onCancel && onCancel(booking.bookingId)}
              >
                <XCircle size={18} />
                Cancel
              </button>
            </div>
         )}
      </div>
    </div>
  );
};

export default BookingCard;
