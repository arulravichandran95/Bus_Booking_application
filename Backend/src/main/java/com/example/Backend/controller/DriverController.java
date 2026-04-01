package com.example.Backend.controller;

import com.example.Backend.dto.DriverManifestDTO;
import com.example.Backend.service.DriverService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for handling driver operations.
 * This controller provides endpoints for drivers to manage trip statuses and view manifests.
 */
// Indicates that this class is a REST controller where every method returns a domain object instead of a view
@RestController
// Maps HTTP requests to handler methods of MVC and REST controllers
@RequestMapping("/api/v1/driver")
// LOMBOK CONSTRUCTOR: Generates a constructor for all final fields, enabling constructor-based dependency injection
@RequiredArgsConstructor
public class DriverController {

    private final DriverService driverService;

    /**
     * Retrieves the passenger manifest for a specific trip.
     * 
     * @param tripId the ID of the trip
     * @return a list of manifest details for the trip
     */
    // Annotation for mapping HTTP GET requests onto specific handler methods
    @GetMapping("/manifest")
    public ResponseEntity<List<DriverManifestDTO>> getManifest(
            // Indicates that a method parameter should be bound to a web request parameter
            @RequestParam("tripId") Long tripId) {
        List<DriverManifestDTO> manifest = driverService.getManifestForTrip(tripId);
        return ResponseEntity.ok(manifest);
    }

    /**
     * Updates the status of a specific trip.
     * 
     * @param tripId the ID of the trip to update
     * @param status the new status to set for the trip
     * @return a success message confirming the status update
     */
    // Annotation for mapping HTTP PUT requests onto specific handler methods
    @PutMapping("/trip/{id}/status")
    public ResponseEntity<String> updateTripStatus(
            // Indicates that a method parameter should be bound to a URI template variable
            @PathVariable("id") Long tripId,
            // Indicates that a method parameter should be bound to a web request parameter
            @RequestParam("status") String status) {
        driverService.updateTripStatus(tripId, status);
        return ResponseEntity.ok("Trip status updated successfully to: " + status);
    }
}
