package com.example.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object representing a passenger's manifest details for a driver.
 * It contains information about a specific booking to be displayed to the driver.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DriverManifestDTO {
    // The unique identifier for the booking
    private String bookingId;
    // The allocated seat number for the passenger
    private String seatNumber;
    // The name of the passenger
    private String passengerName;
    // The current status of the passenger's booking (e.g., CONFIRMED, CANCELLED)
    private String status;
}
