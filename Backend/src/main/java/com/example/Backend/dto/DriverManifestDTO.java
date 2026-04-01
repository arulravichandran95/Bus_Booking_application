package com.example.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Data Transfer Object representing a passenger's manifest details for a driver.
 * It contains information about a specific booking to be displayed to the driver.
 */
// LOMBOK: Generates getters, setters, toString, equals, and hashCode methods
@Data
// LOMBOK: Implements the Builder pattern for object creation
@Builder
// LOMBOK CONSTRUCTOR: Generates a no-arguments constructor
@NoArgsConstructor
// LOMBOK CONSTRUCTOR: Generates a constructor with one parameter for every field in the class
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
