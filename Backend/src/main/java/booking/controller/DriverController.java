package booking.controller;

import booking.dto.DriverManifestDTO;
import booking.service.DriverService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for handling driver operations.
 * This controller provides endpoints for drivers to manage trip statuses and view manifests.
 */
@RestController
@RequestMapping("/api/v1/driver")
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    /**
     * Retrieves the passenger manifest for a specific trip.
     * 
     * @param tripId the ID of the trip
     * @return a list of manifest details for the trip
     */
    @GetMapping("/manifest")
    public ResponseEntity<List<DriverManifestDTO>> getManifest(@RequestParam("tripId") Long tripId) {
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
    @PutMapping("/trip/{id}/status")
    public ResponseEntity<String> updateTripStatus(
            @PathVariable("id") Long tripId,
            @RequestParam("status") String status) {
        driverService.updateTripStatus(tripId, status);
        return ResponseEntity.ok("Trip status updated successfully to: " + status);
    }
}
