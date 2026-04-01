package com.example.Backend.service;

import com.example.Backend.dto.DriverManifestDTO;
import com.example.Backend.entity.Booking;
import com.example.Backend.entity.Trip;
import com.example.Backend.repository.BookingRepository;
import com.example.Backend.repository.TripRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DriverService {

    private final BookingRepository bookingRepository;
    private final TripRepository tripRepository;

    @Transactional(readOnly = true)
    public List<DriverManifestDTO> getManifestForTrip(Long tripId) {
        // Fetch bookings for the given trip that are confirmed
        List<Booking> confirmedBookings = bookingRepository.findByTripIdAndStatus(tripId, "CONFIRMED");
        
        return confirmedBookings.stream()
                .map(booking -> DriverManifestDTO.builder()
                        .bookingId(booking.getBookingId())
                        .seatNumber(booking.getSeatNumber())
                        .passengerName(booking.getUser() != null ? booking.getUser().getName() : "Unknown Passenger")
                        .status(booking.getStatus())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateTripStatus(Long tripId, String status) {
        if (!"IN_PROGRESS".equalsIgnoreCase(status) && !"COMPLETED".equalsIgnoreCase(status)) {
            throw new IllegalArgumentException("Invalid status update. Allowed values: IN_PROGRESS, COMPLETED");
        }

        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new RuntimeException("Trip not found with id: " + tripId));

        trip.setStatus(status.toUpperCase());
        tripRepository.save(trip);
    }
}
