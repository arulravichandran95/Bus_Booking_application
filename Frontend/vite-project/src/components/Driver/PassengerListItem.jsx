import React from 'react';
import styles from './PassengerListItem.module.css';
import { User, CheckCircle, Clock, XCircle, MapPin } from 'lucide-react';

const PassengerListItem = ({ passenger }) => {
  const { bookingId, seatNumber, passengerName, status } = passenger;

  const getStatusIcon = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return <CheckCircle size={18} className={styles.confirmedIcon} />;
      case 'CHECKED_IN':
        return <CheckCircle size={18} className={styles.checkedInIcon} />;
      case 'CANCELLED':
        return <XCircle size={18} className={styles.cancelledIcon} />;
      default:
        return <Clock size={18} className={styles.pendingIcon} />;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'CONFIRMED': return styles.statusConfirmed;
      case 'CHECKED_IN': return styles.statusCheckedIn;
      case 'CANCELLED': return styles.statusCancelled;
      default: return styles.statusPending;
    }
  };

  return (
    <div className={`${styles.item} ${status === 'CANCELLED' ? styles.itemDisabled : ''}`}>
      <div className={styles.seatBadge}>{seatNumber}</div>
      
      <div className={styles.passengerInfo}>
        <div className={styles.nameRow}>
          <User size={16} className={styles.userIcon} />
          <h4 className={styles.name}>{passengerName}</h4>
        </div>
        <div className={styles.bookingRow}>
          <span className={styles.bookingId}>ID: {bookingId}</span>
          <div className={styles.location}>
             <MapPin size={12} />
             <span>Main Station</span>
          </div>
        </div>
      </div>

      <div className={`${styles.statusBadge} ${getStatusClass(status)}`}>
        {getStatusIcon(status)}
        <span>{status.replace('_', ' ')}</span>
      </div>
    </div>
  );
};

export default PassengerListItem;
