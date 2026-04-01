package booking.dto;

import java.math.BigDecimal;

public class RouteSearchDTO {
    private Long tripId;
    private String busName;
    private BigDecimal price;
    private Integer tripHealthScore;
    private String departureTime;

    public RouteSearchDTO() {}

    public RouteSearchDTO(Long tripId, String busName, BigDecimal price, Integer tripHealthScore, String departureTime) {
        this.tripId = tripId;
        this.busName = busName;
        this.price = price;
        this.tripHealthScore = tripHealthScore;
        this.departureTime = departureTime;
    }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }

    public String getBusName() { return busName; }
    public void setBusName(String busName) { this.busName = busName; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public Integer getTripHealthScore() { return tripHealthScore; }
    public void setTripHealthScore(Integer tripHealthScore) { this.tripHealthScore = tripHealthScore; }

    public String getDepartureTime() { return departureTime; }
    public void setDepartureTime(String departureTime) { this.departureTime = departureTime; }
}
