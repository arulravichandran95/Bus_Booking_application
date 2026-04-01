import apiClient from './apiClient';

// ============================================================================
// Dashboard API — Owner Analytics & Driver Manifest
// All calls hit real backend endpoints via the shared apiClient with JWT.
// ============================================================================

export const dashboardApi = {

  // ✅ REAL — GET /api/v1/owner/analytics?tripId=
  getOwnerAnalytics: async (tripId = '101') => {
    try {
      const response = await apiClient.get('/owner/analytics', {
        params: { tripId },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching owner analytics:', error);
      throw error;
    }
  },

  // ✅ REAL — GET /api/v1/driver/manifest?tripId=
  getDriverManifest: async (tripId = '101') => {
    try {
      const response = await apiClient.get('/driver/manifest', {
        params: { tripId },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching driver manifest:', error);
      throw error;
    }
  },

  // ✅ REAL — PUT /api/v1/driver/trip/{tripId}/status?status=IN_PROGRESS
  startTrip: async (tripId) => {
    try {
      const response = await apiClient.put(`/driver/trip/${tripId}/status`, null, {
        params: { status: 'IN_PROGRESS' },
      });
      return response.data;
    } catch (error) {
      console.error('Error starting trip:', error);
      throw error;
    }
  },
};
