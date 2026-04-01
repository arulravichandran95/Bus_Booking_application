package booking.dto;

import java.util.List;

public class PassengerBookingsDTO {
    private List<BookingSummaryDTO> upcoming;
    private List<BookingSummaryDTO> past;

    public PassengerBookingsDTO() {}

    public PassengerBookingsDTO(List<BookingSummaryDTO> upcoming, List<BookingSummaryDTO> past) {
        this.upcoming = upcoming;
        this.past = past;
    }

    public List<BookingSummaryDTO> getUpcoming() { return upcoming; }
    public void setUpcoming(List<BookingSummaryDTO> upcoming) { this.upcoming = upcoming; }

    public List<BookingSummaryDTO> getPast() { return past; }
    public void setPast(List<BookingSummaryDTO> past) { this.past = past; }
}
