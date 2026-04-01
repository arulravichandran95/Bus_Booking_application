package booking.dto;

/**
 * Data Transfer Object representing a passenger's manifest details for a driver.
 * It contains information about a specific booking to be displayed to the driver.
 */

public class DriverManifestDTO {
    private String bookingId;
    private String seatNumber;
    private String passengerName;
    private String status;

    public DriverManifestDTO() {}

    public DriverManifestDTO(String bookingId, String seatNumber, String passengerName, String status) {
        this.bookingId = bookingId;
        this.seatNumber = seatNumber;
        this.passengerName = passengerName;
        this.status = status;
    }

    public static DriverManifestDTOBuilder builder() {
        return new DriverManifestDTOBuilder();
    }

    public static class DriverManifestDTOBuilder {
        private String bookingId;
        private String seatNumber;
        private String passengerName;
        private String status;

        DriverManifestDTOBuilder() {}

        public DriverManifestDTOBuilder bookingId(String bookingId) { this.bookingId = bookingId; return this; }
        public DriverManifestDTOBuilder seatNumber(String seatNumber) { this.seatNumber = seatNumber; return this; }
        public DriverManifestDTOBuilder passengerName(String passengerName) { this.passengerName = passengerName; return this; }
        public DriverManifestDTOBuilder status(String status) { this.status = status; return this; }

        public DriverManifestDTO build() {
            return new DriverManifestDTO(bookingId, seatNumber, passengerName, status);
        }
    }

    public String getBookingId() { return bookingId; }
    public void setBookingId(String bookingId) { this.bookingId = bookingId; }

    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }

    public String getPassengerName() { return passengerName; }
    public void setPassengerName(String passengerName) { this.passengerName = passengerName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
