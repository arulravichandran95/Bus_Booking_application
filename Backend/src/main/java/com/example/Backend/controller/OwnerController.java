package com.example.Backend.controller;

import com.example.Backend.dto.AnalyticsDashboardDTO;
import com.example.Backend.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for handling bus owner operations.
 * This controller provides endpoints for owners to view analytics and metrics.
 */
// Indicates that this class is a REST controller where every method returns a domain object instead of a view
@RestController
// Maps HTTP requests to handler methods of MVC and REST controllers
@RequestMapping("/api/v1/owner")
// LOMBOK CONSTRUCTOR: Generates a constructor for all final fields, enabling constructor-based dependency injection
@RequiredArgsConstructor
public class OwnerController {

    private final AnalyticsService analyticsService;

    /**
     * Retrieves the analytics dashboard data for a specific trip.
     * 
     * @param tripId the ID of the trip
     * @return the analytics dashboard data including occupancy and revenue
     */
    // Annotation for mapping HTTP GET requests onto specific handler methods
    @GetMapping("/analytics")
    public ResponseEntity<AnalyticsDashboardDTO> getAnalytics(
            // Indicates that a method parameter should be bound to a web request parameter
            @RequestParam("tripId") Long tripId) {
        AnalyticsDashboardDTO dashboard = analyticsService.getAnalyticsForTrip(tripId);
        return ResponseEntity.ok(dashboard);
    }
}
