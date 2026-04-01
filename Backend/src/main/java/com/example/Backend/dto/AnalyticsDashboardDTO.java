package com.example.Backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Data Transfer Object representing the analytics dashboard view for bus owners.
 * It encapsulates metrics such as occupancy percentage, revenue, and insights.
 */
// LOMBOK: Generates getters, setters, toString, equals, and hashCode methods
@Data
// LOMBOK: Implements the Builder pattern for object creation
@Builder
// LOMBOK CONSTRUCTOR: Generates a no-arguments constructor
@NoArgsConstructor
// LOMBOK CONSTRUCTOR: Generates a constructor with one parameter for every field in the class
@AllArgsConstructor
public class AnalyticsDashboardDTO {
    // The percentage of seats occupied on the trip
    private double occupancyPercentage;
    // Revenue specific metrics for the trip
    private RevenueMetrics revenueMetrics;
    // Important insights or alerts related to the trip
    private String insightCard;

    /**
     * Nested static class representing detailed revenue metrics.
     */
    // LOMBOK: Generates getters, setters, toString, equals, and hashCode methods
    @Data
    // LOMBOK: Implements the Builder pattern for object creation
    @Builder
    // LOMBOK CONSTRUCTOR: Generates a no-arguments constructor
    @NoArgsConstructor
    // LOMBOK CONSTRUCTOR: Generates a constructor with one parameter for every field in the class
    @AllArgsConstructor
    public static class RevenueMetrics {
        // Total revenue generated from the trip
        private double totalRevenue;
        // Heatmap data representing revenue variations or patterns
        private List<Object> heatmap;
    }
}
