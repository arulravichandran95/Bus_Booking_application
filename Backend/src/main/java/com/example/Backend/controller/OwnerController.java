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
@RestController
@RequestMapping("/api/v1/owner")
@RequiredArgsConstructor
public class OwnerController {

    private final AnalyticsService analyticsService;

    /**
     * Retrieves the analytics dashboard data for a specific trip.
     * 
     * @param tripId the ID of the trip
     * @return the analytics dashboard data including occupancy and revenue
     */
    @GetMapping("/analytics")
    public ResponseEntity<AnalyticsDashboardDTO> getAnalytics(@RequestParam("tripId") Long tripId) {
        AnalyticsDashboardDTO dashboard = analyticsService.getAnalyticsForTrip(tripId);
        return ResponseEntity.ok(dashboard);
    }
}
