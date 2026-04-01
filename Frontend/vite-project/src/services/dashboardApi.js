import axios from 'axios';

const API_BASE_URL = '/api/v1'; // Base URL for the API

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock Data for Owner Analytics
const mockOwnerData = {
  occupancyPercentage: 75,
  revenueMetrics: {
    totalRevenue: 15450,
    heatmap: [
      { day: 'Mon', revenue: 2100 },
      { day: 'Tue', revenue: 1850 },
      { day: 'Wed', revenue: 2400 },
      { day: 'Thu', revenue: 1900 },
      { day: 'Fri', revenue: 2800 },
      { day: 'Sat', revenue: 3200 },
      { day: 'Sun', revenue: 1200 },
    ]
  },
  insightCard: "Route CBE->Chennai is highest earner this week. Consider adding an extra 10:00 PM trip."
};

// Mock Data for Driver Manifest
const mockManifestData = [
  { bookingId: "BK1001", seatNumber: "A1", passengerName: "John Doe", status: "CONFIRMED" },
  { bookingId: "BK1002", seatNumber: "A2", passengerName: "Jane Smith", status: "CONFIRMED" },
  { bookingId: "BK1003", seatNumber: "B1", passengerName: "Michael Clark", status: "CONFIRMED" },
  { bookingId: "BK1004", seatNumber: "B2", passengerName: "Sarah Connor", status: "CHECKED_IN" },
  { bookingId: "BK1005", seatNumber: "C1", passengerName: "David Miller", status: "CONFIRMED" },
  { bookingId: "BK1006", seatNumber: "C2", passengerName: "Lisa Wong", status: "CANCELLED" },
];

export const dashboardApi = {
  /**
   * Fetches analytics for the owner dashboard.
   * @param {string} tripId - The ID of the trip to fetch analytics for.
   * @returns {Promise<Object>} The analytics data.
   */
  getOwnerAnalytics: async (tripId = '101') => {
    try {
      // In a real app, we would use:
      // const response = await apiClient.get(`/owner/analytics?tripId=${tripId}`);
      // return response.data;
      
      // Simulate API lag and return mock data for now
      return new Promise((resolve) => {
        setTimeout(() => {
          // Add some randomness to mock polling updates
          const updatedMock = {
            ...mockOwnerData,
            occupancyPercentage: Math.min(100, Math.max(0, mockOwnerData.occupancyPercentage + (Math.random() * 4 - 2)))
          };
          resolve(updatedMock);
        }, 500);
      });
    } catch (error) {
      console.error("Error fetching owner analytics:", error);
      throw error;
    }
  },

  /**
   * Fetches the passenger manifest for a specific trip.
   * @param {string} tripId - The ID of the trip to fetch the manifest for.
   * @returns {Promise<Array>} The passenger manifest.
   */
  getDriverManifest: async (tripId = '101') => {
    try {
      // const response = await apiClient.get(`/driver/manifest?tripId=${tripId}`);
      // return response.data;

      return new Promise((resolve) => {
        setTimeout(() => resolve(mockManifestData), 500);
      });
    } catch (error) {
      console.error("Error fetching driver manifest:", error);
      throw error;
    }
  },

  /**
   * Signals the start of a trip.
   * @param {string} tripId - The ID of the trip to start.
   * @returns {Promise<Object>} The status of the operation.
   */
  startTrip: async (tripId) => {
    try {
      // const response = await apiClient.post(`/driver/start-trip`, { tripId });
      // return response.data;
      return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true, message: `Trip ${tripId} started successfully.` }), 800);
      });
    } catch (error) {
       console.error("Error starting trip:", error);
       throw error;
    }
  }
};
