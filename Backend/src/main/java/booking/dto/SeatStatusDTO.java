package booking.dto;

public class SeatStatusDTO {
    private String seatNumber;
    private String status;

    public SeatStatusDTO() {}

    public SeatStatusDTO(String seatNumber, String status) {
        this.seatNumber = seatNumber;
        this.status = status;
    }

    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
