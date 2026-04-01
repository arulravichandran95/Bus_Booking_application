package booking.service;

import booking.dto.AnalyticsDashboardDTO;
import booking.repository.BookingRepository;
import booking.repository.SeatStatusRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AnalyticsService {

    private final SeatStatusRepository seatStatusRepository;
    private final BookingRepository bookingRepository;

    public AnalyticsService(SeatStatusRepository seatStatusRepository, BookingRepository bookingRepository) {
        this.seatStatusRepository = seatStatusRepository;
        this.bookingRepository = bookingRepository;
    }

    public AnalyticsDashboardDTO getAnalyticsForTrip(Long tripId) {
        // Query SeatStatus for total vs booked seats to calculate Live Occupancy %
        long totalSeats = seatStatusRepository.countByTripId(tripId);
        long bookedSeats = seatStatusRepository.countByTripIdAndStatus(tripId, "BOOKED");

        double occupancyPercentage = 0.0;
        if (totalSeats > 0) {
            occupancyPercentage = ((double) bookedSeats / totalSeats) * 100.0;
        }

        // Query Booking to calculate total revenue for CONFIRMED bookings
        Double totalRevenue = bookingRepository.sumRevenueByTripIdAndStatus(tripId, "CONFIRMED");
        if (totalRevenue == null) {
            totalRevenue = 0.0;
        }

        AnalyticsDashboardDTO.RevenueMetrics metrics = AnalyticsDashboardDTO.RevenueMetrics.builder()
                .totalRevenue(totalRevenue)
                .heatmap(Collections.emptyList()) 
                .build();

        // Returning the mock AI insight string as requested
        return AnalyticsDashboardDTO.builder()
                .occupancyPercentage(Math.round(occupancyPercentage))
                .revenueMetrics(metrics)
                .insightCard("Route CBE->Chennai is highest earner this week.")
                .build();
    }
}
