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

  getPassengerBookings: async () => {
    await delay(600);
    return {
      data: {
        upcoming: [
          {
            bookingId: "BKG-84729",
            tripId: "101",
            busName: "Royal Travels A/C Sleeper",
            source: "Coimbatore (CBE)",
            destination: "Chennai (CHN)",
            date: "2026-04-10",
            departureTime: "21:00",
            seats: "A10, A11",
            amount: 1900,
            status: "CONFIRMED"
          }
        ],
        past: [
          {
            bookingId: "BKG-29384",
            tripId: "84",
            busName: "KPN Travels Non-A/C Seater",
            source: "Chennai (CHN)",
            destination: "Madurai (IXM)",
            date: "2026-03-15",
            departureTime: "10:30",
            seats: "C4",
            amount: 750,
            status: "COMPLETED"
          },
          {
            bookingId: "BKG-11928",
            tripId: "42",
            busName: "IntrCity SmartBus",
            source: "Bangalore (BLR)",
            destination: "Coimbatore (CBE)",
            date: "2026-02-28",
            departureTime: "23:15",
            seats: "L1, L2",
            amount: 2200,
            status: "CANCELLED"
          }
        ]
      }
    };
  },

  cancelBooking: async (bookingId) => {
    await delay(800);
    return { data: { success: true, message: `Booking ${bookingId} has been canceled successfully.` } };
  },

  getTripStatus: async (tripId) => {
    // Randomize status for demo
    const statuses = ['SCHEDULED', 'IN_PROGRESS'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    return { data: { status: randomStatus } };
  },
};