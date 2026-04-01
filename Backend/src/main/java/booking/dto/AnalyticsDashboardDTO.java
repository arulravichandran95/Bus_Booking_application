package booking.dto;

import java.util.List;

/**
 * Data Transfer Object representing the analytics dashboard view for bus owners.
 * It encapsulates metrics such as occupancy percentage, revenue, and insights.
 */
public class AnalyticsDashboardDTO {
    private double occupancyPercentage;
    private RevenueMetrics revenueMetrics;
    private String insightCard;

    public AnalyticsDashboardDTO() {}

    public AnalyticsDashboardDTO(double occupancyPercentage, RevenueMetrics revenueMetrics, String insightCard) {
        this.occupancyPercentage = occupancyPercentage;
        this.revenueMetrics = revenueMetrics;
        this.insightCard = insightCard;
    }

    public static AnalyticsDashboardDTOBuilder builder() {
        return new AnalyticsDashboardDTOBuilder();
    }

    public static class AnalyticsDashboardDTOBuilder {
        private double occupancyPercentage;
        private RevenueMetrics revenueMetrics;
        private String insightCard;

        AnalyticsDashboardDTOBuilder() {}

        public AnalyticsDashboardDTOBuilder occupancyPercentage(double occupancyPercentage) { this.occupancyPercentage = occupancyPercentage; return this; }
        public AnalyticsDashboardDTOBuilder revenueMetrics(RevenueMetrics revenueMetrics) { this.revenueMetrics = revenueMetrics; return this; }
        public AnalyticsDashboardDTOBuilder insightCard(String insightCard) { this.insightCard = insightCard; return this; }

        public AnalyticsDashboardDTO build() {
            return new AnalyticsDashboardDTO(occupancyPercentage, revenueMetrics, insightCard);
        }
    }

    public double getOccupancyPercentage() { return occupancyPercentage; }
    public void setOccupancyPercentage(double occupancyPercentage) { this.occupancyPercentage = occupancyPercentage; }

    public RevenueMetrics getRevenueMetrics() { return revenueMetrics; }
    public void setRevenueMetrics(RevenueMetrics revenueMetrics) { this.revenueMetrics = revenueMetrics; }

    public String getInsightCard() { return insightCard; }
    public void setInsightCard(String insightCard) { this.insightCard = insightCard; }

    public static class RevenueMetrics {
        private double totalRevenue;
        private List<Object> heatmap;

        public RevenueMetrics() {}

        public RevenueMetrics(double totalRevenue, List<Object> heatmap) {
            this.totalRevenue = totalRevenue;
            this.heatmap = heatmap;
        }

        public static RevenueMetricsBuilder builder() {
            return new RevenueMetricsBuilder();
        }

        public static class RevenueMetricsBuilder {
            private double totalRevenue;
            private List<Object> heatmap;

            RevenueMetricsBuilder() {}

            public RevenueMetricsBuilder totalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; return this; }
            public RevenueMetricsBuilder heatmap(List<Object> heatmap) { this.heatmap = heatmap; return this; }

            public RevenueMetrics build() {
                return new RevenueMetrics(totalRevenue, heatmap);
            }
        }

        public double getTotalRevenue() { return totalRevenue; }
        public void setTotalRevenue(double totalRevenue) { this.totalRevenue = totalRevenue; }

        public List<Object> getHeatmap() { return heatmap; }
        public void setHeatmap(List<Object> heatmap) { this.heatmap = heatmap; }
    }
}
