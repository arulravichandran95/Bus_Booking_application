import React, { useState, useEffect, useRef } from 'react';
import styles from './AnalyticsDashboard.module.css';
import { dashboardApi } from '../../services/dashboardApi';
import InsightCard from '../../components/Owner/InsightCard';
import OccupancyRingChart from '../../components/Owner/OccupancyRingChart';
import RevenueHeatmap from '../../components/Owner/RevenueHeatmap';
import { LayoutDashboard, Calendar, Search, RefreshCw } from 'lucide-react';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPolling, setIsPolling] = useState(true);
  
  // Reference for the interval to clear on unmount
  const pollIntervalRef = useRef(null);

  const fetchAnalytics = async () => {
    try {
      const data = await dashboardApi.getOwnerAnalytics('101');
      setAnalytics(data);
      if (loading) setLoading(false);
    } catch (error) {
      console.error("Failed to fetch analytics", error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchAnalytics();

    // Set polling every 3 seconds
    if (isPolling) {
      pollIntervalRef.current = setInterval(fetchAnalytics, 3000);
    }

    // Cleanup on unmount or when polling state changes
    return () => {
      if (pollIntervalRef.current) {
         clearInterval(pollIntervalRef.current);
      }
    };
  }, [isPolling]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <RefreshCw className={styles.loaderIcon} />
        <p>Loading Analytics...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <LayoutDashboard className={styles.headerIcon} />
          <div>
            <h1>BusSync Analytics</h1>
            <p className={styles.subtitle}>Owner Control Center</p>
          </div>
        </div>
        
        <div className={styles.controls}>
           <Link to="/owner/fleet" className={`${styles.tripSelector} ${styles.fleetBtn}`}>
              <Bus size={18} />
              <span>Fleet Management</span>
           </Link>
           <div className={styles.searchBox}>
              <Search size={16} />
              <input type="text" placeholder="Search Trips..." />
           </div>
           <button className={styles.tripSelector}>
              <Calendar size={18} />
              <span>Trip #101 (CBE-CHN)</span>
           </button>
        </div>
      </header>
      
      <main className={styles.mainContent}>
        <InsightCard insight={analytics.insightCard} />
        
        <div className={styles.grid}>
          <div className={styles.chartCol}>
             <OccupancyRingChart percentage={analytics.occupancyPercentage} />
          </div>
          <div className={styles.chartCol}>
             <RevenueHeatmap 
               data={analytics.revenueMetrics.heatmap} 
               totalRevenue={analytics.revenueMetrics.totalRevenue} 
             />
          </div>
        </div>

        <section className={styles.section}>
           <h3 className={styles.sectionTitle}>Real-time Activity</h3>
           <div className={styles.activityCard}>
              <div className={styles.activityItem}>
                 <span className={styles.activityDot} />
                 <span>Passenger BK1025 checked in (Seat A10)</span>
                 <span className={styles.activityTime}>Just Now</span>
              </div>
              <div className={styles.activityItem}>
                 <span className={styles.activityDot} />
                 <span>Payment received for booking BK1032</span>
                 <span className={styles.activityTime}>5 mins ago</span>
              </div>
           </div>
        </section>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;
