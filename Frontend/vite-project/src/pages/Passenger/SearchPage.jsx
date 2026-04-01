import React, { useState } from 'react';
import { passengerApi } from '../../services/passengerApi';
import TripCard from '../../components/Passenger/TripCard';
import styles from './SearchPage.module.css';

const SearchPage = () => {
  const [search, setSearch] = useState({ from: 'CBE', to: 'Chennai', date: '2025-10-27' });
  const [trips, setTrips] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);

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

      {/* Results Section */}
      <div className={styles.resultsContainer}>
        {hasSearched && (
          <div className={styles.resultsHeader}>
            <h2>{trips.length} Buses Found</h2>
            <p>{search.from} to {search.to} on {new Date(search.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric'})}</p>
          </div>
        )}
        
        <div className={styles.results}>
          {trips.map(trip => <TripCard key={trip.tripId} trip={trip} />)}
        </div>
        
        {hasSearched && trips.length === 0 && (
          <div className={styles.noResults}>
            <h3>No buses found</h3>
            <p>Try changing your route or date to see more options.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default SearchPage;