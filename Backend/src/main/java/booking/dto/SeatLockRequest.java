package booking.dto;

public class SeatLockRequest {

    private Long tripId;
    private String seatNumber;

    public SeatLockRequest() {}

    public SeatLockRequest(Long tripId, String seatNumber) {
        this.tripId = tripId;
        this.seatNumber = seatNumber;
    }

    public static SeatLockRequestBuilder builder() {
        return new SeatLockRequestBuilder();
    }

    public static class SeatLockRequestBuilder {
        private Long tripId;
        private String seatNumber;

        SeatLockRequestBuilder() {}

        public SeatLockRequestBuilder tripId(Long tripId) { this.tripId = tripId; return this; }
        public SeatLockRequestBuilder seatNumber(String seatNumber) { this.seatNumber = seatNumber; return this; }

        public SeatLockRequest build() {
            return new SeatLockRequest(tripId, seatNumber);
        }
    }

    public Long getTripId() { return tripId; }
    public void setTripId(Long tripId) { this.tripId = tripId; }

    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }
}
