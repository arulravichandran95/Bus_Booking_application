import React from 'react';
import styles from './SeatGrid.module.css';

const SeatGrid = ({ seats, onSelect, selected }) => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        {seats.map((seat) => {
          const isSelected = selected === seat.seatNumber;
          const statusClass = seat.status?.toLowerCase() || 'available';
          const isDisabled = statusClass === 'booked' || statusClass === 'locked';
          
          return (
            <button
              key={seat.seatNumber || seat.id || Math.random()}
              className={`${styles.seat} ${styles[statusClass]} ${isSelected ? styles.selected : ''}`}
              disabled={isDisabled}
              onClick={() => !isDisabled && onSelect(seat.seatNumber)}
              aria-label={`Seat ${seat.seatNumber}`}
              title={`Seat ${seat.seatNumber}`}
            >
              <span className={styles.seatLabel}>{seat.seatNumber}</span>
              <div className={styles.seatArmrest}></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SeatGrid;