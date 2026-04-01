package booking.service;

import booking.dto.DriverManifestDTO;
import booking.model.Booking;
import booking.model.Trip;
import booking.repository.BookingRepository;
import booking.repository.TripRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DriverService {

    private final BookingRepository bookingRepository;
    private final TripRepository tripRepository;

    public DriverService(BookingRepository bookingRepository, TripRepository tripRepository) {
        this.bookingRepository = bookingRepository;
        this.tripRepository = tripRepository;
    }

    @Transactional(readOnly = true)
    public List<DriverManifestDTO> getManifestForTrip(Long tripId) {
        // Fetch bookings for the given trip that are confirmed
        List<Booking> confirmedBookings = bookingRepository.findByTripIdAndStatus(tripId, "CONFIRMED");
        
        return confirmedBookings.stream()
                .map(booking -> DriverManifestDTO.builder()
                        .bookingId(booking.getId() != null ? booking.getId().toString() : null)
                        .seatNumber(booking.getSeatStatus() != null ? booking.getSeatStatus().getSeatNumber() : "Unknown")
                        .passengerName(booking.getPassenger() != null ? booking.getPassenger().getFullName() : "Unknown Passenger")
                        .status(booking.getStatus())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateTripStatus(Long tripId, String status) {
        if (!"IN_PROGRESS".equalsIgnoreCase(status) && !"COMPLETED".equalsIgnoreCase(status)) {
            throw new IllegalArgumentException("Invalid status update. Allowed values: IN_PROGRESS, COMPLETED");
        }

        if (tripId == null) {
            throw new IllegalArgumentException("Trip ID cannot be null");
        }
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + tripId));

        trip.setStatus(status.toUpperCase());
        tripRepository.save(trip);
    }
}
