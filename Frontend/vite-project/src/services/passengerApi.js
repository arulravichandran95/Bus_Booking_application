// import axios from 'axios';

// const api = axios.create({
//   baseURL: '/api/v1',
// });

// MOCK API LAYER
// Returns hardcoded promises so the app functions fully without a backend.
// To use real backend, uncomment the axios lines above and restore the old `passengerApi`.

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const passengerApi = {
  login: async (credentials) => {
    await delay(800);
    // Automatically accept any credentials
    return { data: { token: 'mock-jwt-token-12345', role: credentials.role } };
  },

  searchTrips: async (from, to, date) => {
    await delay(1000);
    return {
      data: [
        { tripId: 101, busName: 'Royal Travels', source: from, destination: to, departureTime: '21:00', arrivalTime: '05:30', duration: '8h 30m', price: 950, type: 'A/C Sleeper', seatsAvailable: 12 },
        { tripId: 102, busName: 'KPN Travels', source: from, destination: to, departureTime: '22:30', arrivalTime: '06:00', duration: '7h 30m', price: 850, type: 'Non A/C Semi-Sleeper', seatsAvailable: 5 },
        { tripId: 103, busName: 'IntrCity SmartBus', source: from, destination: to, departureTime: '23:15', arrivalTime: '06:45', duration: '7h 30m', price: 1100, type: 'Volvo Multi-Axle A/C', seatsAvailable: 24 },
        { tripId: 104, busName: 'SRS Travels', source: from, destination: to, departureTime: '18:00', arrivalTime: '02:00', duration: '8h 00m', price: 600, type: 'Non A/C Seater', seatsAvailable: 30 }
      ]
    };
  },

  getSeatStatus: async (tripId) => {
    await delay(800);
    // Generate a beautiful mock 40 seat layout
    const mockSeats = Array.from({length: 40}, (_, i) => {
      let status = 'AVAILABLE';
      if (i === 12 || i === 15 || i === 22 || i === 23) status = 'BOOKED';
      if (i === 5 || i === 18) status = 'LOCKED'; // simulated locked by someone else
      return { seatNumber: `${i+1}`, status };
    });
    return { data: mockSeats };
  },

  lockSeat: async (tripId, seatNumber) => {
    await delay(600);
    return { data: { lockId: `LOCK-${Date.now()}` } };
  },

  confirmBooking: async (lockId, passengerDetails) => {
    await delay(1200);
    return { 
      data: { 
        bookingId: `BKG-${Math.floor(Math.random() * 90000) + 10000}`,
        qrCode: "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", // minimal transp base64
        seatDetails: passengerDetails
      }
    };
  },

  getTripStatus: async (tripId) => {
    // Randomize status for demo
    const statuses = ['SCHEDULED', 'IN_PROGRESS'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    return { data: { status: randomStatus } };
  },
};