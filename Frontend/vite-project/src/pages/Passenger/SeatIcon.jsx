import React from 'react';
import styles from './SeatIcon.module.css';

const SeatIcon = ({ seat, isSelected, onClick }) => {
  const getSeatClass = () => {
    if (seat.isLocked) return styles.locked;
    if (seat.isBooked) return styles.booked;
    if (isSelected) return styles.selected;
    return styles.available;
  };

  return (
    <div 
      className={`${styles.seat} ${getSeatClass()}`} 
      onClick={onClick}
      title={`Seat ${seat.number}`}
    >
      <span className={styles.seatNumber}>{seat.number}</span>
      <div className={styles.seatBack}></div>
    </div>
  );
};

export default SeatIcon;
