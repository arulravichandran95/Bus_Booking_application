import React, { useState, useEffect } from 'react';
import { passengerApi } from '../../services/passengerApi';
import TripCard from '../../components/Passenger/TripCard';
import BookingCard from '../../components/Passenger/BookingCard';
import styles from './SearchPage.module.css';
import { Loader2 } from 'lucide-react';

const SearchPage = () => {
  const [search, setSearch] = useState({ from: 'CBE', to: 'Chennai', date: '2026-04-10' });
  const [trips, setTrips] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  // Bookings State
  const [upcoming, setUpcoming] = useState([]);
  const [past, setPast] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await passengerApi.getPassengerBookings();
        setUpcoming(response.data.upcoming);
        setPast(response.data.past);
      } catch (error) {
        console.error("Failed to fetch passenger bookings:", error);
      } finally {
        setLoadingBookings(false);
      }
    };
    fetchBookings();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await passengerApi.searchTrips(search.from, search.to, search.date);
      setTrips(res.data);
      setHasSearched(true);
    } catch (err) {
      console.error("API Error:", err);
      alert("Failed to fetch buses. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm(`Are you sure you want to cancel booking ${bookingId}?\nThis action cannot be undone.`);
    if (!confirmCancel) return;

    try {
      setLoadingBookings(true);
      await passengerApi.cancelBooking(bookingId);
      
      // Update local state instantly
      const updatedUpcoming = upcoming.filter(b => b.bookingId !== bookingId);
      const canceledBooking = upcoming.find(b => b.bookingId === bookingId);
      
      if (canceledBooking) {
        setUpcoming(updatedUpcoming);
        setPast([{ ...canceledBooking, status: 'CANCELLED' }, ...past]);
      }
      
      alert(`Booking ${bookingId} has been successfully canceled.`);
    } catch (error) {
      console.error("Cancellation failed:", error);
      alert("Failed to cancel the booking. Please try again later.");
    } finally {
      setLoadingBookings(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}

      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1>Where to next?</h1>
          <p>Book premium bus tickets with ease and comfort.</p>
          
          <form className={styles.searchBar} onSubmit={handleSearch}>
            <div className={styles.inputGroup}>
              <div className={styles.inputWrapper}>
                <label>Leaving from</label>
                <input type="text" value={search.from} onChange={(e) => setSearch({...search, from: e.target.value})} required/>
              </div>
              
              <div className={styles.divider}></div>
              
              <div className={styles.inputWrapper}>
                <label>Going to</label>
                <input type="text" value={search.to} onChange={(e) => setSearch({...search, to: e.target.value})} required/>
              </div>
              
              <div className={styles.divider}></div>
              
              <div className={styles.inputWrapper}>
                <label>Date of journey</label>
                <input type="date" value={search.date} onChange={(e) => setSearch({...search, date: e.target.value})} required/>
              </div>
            </div>
            
            <button type="submit" className={styles.searchBtn} disabled={loading}>
              {loading ? 'Searching...' : 'Search Buses'}
            </button>
          </form>
        </div>
      </div>

      {/* Results or History Section */}
      <div className={styles.resultsContainer}>
        {hasSearched ? (
          <>
            <div className={styles.resultsHeader}>
              <h2>{trips.length} Buses Found</h2>
              <p>{search.from} to {search.to} on {new Date(search.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric'})}</p>
            </div>
            
            <div className={styles.results}>
              {trips.map(trip => <TripCard key={trip.tripId} trip={trip} />)}
            </div>
            
            {trips.length === 0 && (
              <div className={styles.noResults}>
                <h3>No buses found</h3>
                <p>Try changing your route or date to see more options.</p>
              </div>
            )}
          </>
        ) : (
          <div className={styles.dashboardSection}>
            {loadingBookings ? (
               <div className={styles.loadingBookings}>
                 <Loader2 className={styles.spinner} size={32} />
                 <p>Loading your journeys...</p>
               </div>
            ) : (
               <>
                 {upcoming.length > 0 && (
                   <div className={styles.bookingGroup}>
                     <div className={styles.groupHeader}>
                        <h2>Upcoming Journeys</h2>
                        <span className={styles.badge}>{upcoming.length} Trip{upcoming.length > 1 ? 's' : ''}</span>
                     </div>
                     <div className={styles.grid}>
                       {upcoming.map(b => <BookingCard key={b.bookingId} booking={b} onCancel={handleCancel} />)}
                     </div>
                   </div>
                 )}

                 {past.length > 0 && (
                   <div className={styles.bookingGroup}>
                     <div className={styles.groupHeader}>
                        <h2>Journey History</h2>
                     </div>
                     <div className={styles.grid}>
                       {past.map(b => <BookingCard key={b.bookingId} booking={b} onCancel={handleCancel} />)}
                     </div>
                   </div>
                 )}

                 {upcoming.length === 0 && past.length === 0 && (
                   <div className={styles.noBookings}>
                      <h2>No bookings found</h2>
                      <p>You haven't booked any tickets yet. Search for a destination above to start your journey!</p>
                   </div>
                 )}
               </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchPage;