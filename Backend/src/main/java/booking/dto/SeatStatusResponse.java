package booking.dto;

public class SeatStatusResponse {

    private Long lockId;
    private String bookingId;
    private String qrCode;
    private String message;

    public SeatStatusResponse() {}

    public SeatStatusResponse(Long lockId, String bookingId, String qrCode, String message) {
        this.lockId = lockId;
        this.bookingId = bookingId;
        this.qrCode = qrCode;
        this.message = message;
    }

    public static SeatStatusResponseBuilder builder() {
        return new SeatStatusResponseBuilder();
    }

    public static class SeatStatusResponseBuilder {
        private Long lockId;
        private String bookingId;
        private String qrCode;
        private String message;

        SeatStatusResponseBuilder() {}

        public SeatStatusResponseBuilder lockId(Long lockId) { this.lockId = lockId; return this; }
        public SeatStatusResponseBuilder bookingId(String bookingId) { this.bookingId = bookingId; return this; }
        public SeatStatusResponseBuilder qrCode(String qrCode) { this.qrCode = qrCode; return this; }
        public SeatStatusResponseBuilder message(String message) { this.message = message; return this; }

        public SeatStatusResponse build() {
            return new SeatStatusResponse(lockId, bookingId, qrCode, message);
        }
    }

    public Long getLockId() { return lockId; }
    public void setLockId(Long lockId) { this.lockId = lockId; }

    public String getBookingId() { return bookingId; }
    public void setBookingId(String bookingId) { this.bookingId = bookingId; }

    public String getQrCode() { return qrCode; }
    public void setQrCode(String qrCode) { this.qrCode = qrCode; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
