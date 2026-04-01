import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { passengerApi } from '../../services/passengerApi';
import SeatGrid from '../../components/Passenger/SeatGrid';
import styles from './SeatMapPage.module.css';

const SeatMapPage = () => {
    const { tripId } = useParams();
    const navigate = useNavigate();
    const [seats, setSeats] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSeats = async () => {
            try {
                const res = await passengerApi.getSeatStatus(tripId);
                setSeats(res.data);
            } catch (err) {
                console.error("API Error: Fetching seats failed", err);
            } finally {
                setLoading(false);
            }
        };
        fetchSeats();
        const interval = setInterval(fetchSeats, 5000); // Slightly slower polling to reduce load
        return () => clearInterval(interval);
    }, [tripId]);

    const handleLockSeat = async () => {
        if (!selectedSeat) return;
        try {
            const res = await passengerApi.lockSeat(tripId, selectedSeat);
            navigate('/passenger/confirm', { state: { lockId: res.data.lockId, tripId } });
        } catch (err) {
            alert("Seat could not be locked. Please try again.");
        }
    };

    if (loading) return <div className={styles.loadingState}>Loading seat map...</div>;

    return (
        <div className={styles.container}>
            <div className={styles.pageHeader}>
                <h2>Select your seat</h2>
                <p>Trip #{tripId}</p>
            </div>
            
            <div className={styles.contentLayout}>
                <div className={styles.seatMapSection}>
                    <div className={styles.busLayout}>
                        <div className={styles.steeringWheel}></div>
                        <SeatGrid seats={seats} onSelect={setSelectedSeat} selected={selectedSeat} />
                    </div>
                </div>
                
                <div className={styles.bookingPanel}>
                    <div className={styles.panelCard}>
                        <h3>Booking Summary</h3>
                        
                        <div className={styles.legend}>
                            <div className={styles.legendItem}>
                                <div className={`${styles.legendBox} ${styles.available}`}></div>
                                <span>Available</span>
                            </div>
                            <div className={styles.legendItem}>
                                <div className={`${styles.legendBox} ${styles.selected}`}></div>
                                <span>Selected</span>
                            </div>
                            <div className={styles.legendItem}>
                                <div className={`${styles.legendBox} ${styles.booked}`}></div>
                                <span>Booked</span>
                            </div>
                        </div>

                        <div className={styles.summaryDetails}>
                            <div className={styles.detailRow}>
                                <span>Selected Seat</span>
                                <strong>{selectedSeat || '--'}</strong>
                            </div>
                            <div className={styles.divider}></div>
                            <div className={styles.detailRow}>
                                <span>Base Fare</span>
                                <strong>{selectedSeat ? '₹850' : '₹0'}</strong>
                            </div>
                        </div>

                        <button
                            className="btn-primary"
                            style={{width: '100%'}}
                            disabled={!selectedSeat}
                            onClick={handleLockSeat}
                        >
                            Proceed to Book {selectedSeat ? `(${selectedSeat})` : ''}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default SeatMapPage;