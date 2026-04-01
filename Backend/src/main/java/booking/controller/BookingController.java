package booking.controller;

import booking.dto.BookingConfirmDTO;
import booking.dto.SeatStatusResponse;
import booking.model.Booking;
import booking.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/confirm")
    public ResponseEntity<SeatStatusResponse> confirmBooking(@RequestBody BookingConfirmDTO confirmDTO) {
        Booking booking = bookingService.confirmBooking(confirmDTO);

        SeatStatusResponse response = SeatStatusResponse.builder()
                .bookingId("BK" + booking.getId())
                .qrCode(booking.getQrCodeString())
                .message("Booking confirmed")
                .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
