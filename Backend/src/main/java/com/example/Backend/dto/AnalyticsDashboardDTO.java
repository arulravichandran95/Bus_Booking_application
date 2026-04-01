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
@Data
@Builder
@NoArgsConstructor
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
    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class RevenueMetrics {
        // Total revenue generated from the trip
        private double totalRevenue;
        // Heatmap data representing revenue variations or patterns
        private List<Object> heatmap;
    }
}
