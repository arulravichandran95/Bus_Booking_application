import apiClient from './apiClient';

// ============================================================================
// REAL API LAYER — Uses the shared apiClient (axios) with JWT interceptor.
// All calls hit real backend endpoints.
// ============================================================================

export const passengerApi = {

  // ✅ REAL — POST /api/v1/auth/login
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', {
      username: credentials.email,   // Backend expects "username" field
      password: credentials.password,
    });
    return response;
  },

  // ✅ REAL — POST /api/v1/auth/register
  register: async (credentials) => {
    const response = await apiClient.post('/auth/register', {
      email: credentials.email,
      password: credentials.password,
      fullName: credentials.fullName,
      role: credentials.role
    });
    return response;
  },

  // ✅ REAL — GET /api/v1/routes/search?from=&to=&date=
  searchTrips: async (from, to, date) => {
    const response = await apiClient.get('/routes/search', {
      params: { from, to, date },
    });
    return response;
  },

  // ✅ REAL — GET /api/v1/seats/status?tripId=
  getSeatStatus: async (tripId) => {
    const response = await apiClient.get('/seats/status', {
      params: { tripId }
    });
    return response;
  },

  // ✅ REAL — POST /api/v1/seats/lock
  lockSeat: async (tripId, seatNumber) => {
    const response = await apiClient.post('/seats/lock', { tripId, seatNumber });
    return response;
  },

  // ✅ REAL — POST /api/v1/bookings/confirm
  confirmBooking: async (lockId, passengerDetails) => {
    const response = await apiClient.post('/bookings/confirm', {
      lockId,
      ...passengerDetails,
    });
    return response;
  },

  // ✅ REAL — GET /api/v1/bookings
  getPassengerBookings: async () => {
    const response = await apiClient.get('/bookings');
    return response;
  },

  // ✅ REAL — DELETE /api/v1/bookings/{id}
  cancelBooking: async (bookingId) => {
    const response = await apiClient.delete(`/bookings/${bookingId}`);
    return response;
  },

  // ✅ REAL — GET /api/v1/routes/trip/{id}/status
  getTripStatus: async (tripId) => {
    const response = await apiClient.get(`/routes/trip/${tripId}/status`);
    return response;
  },
};