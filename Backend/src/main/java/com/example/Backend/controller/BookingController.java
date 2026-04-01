package com.example.Backend.controller;

import com.example.Backend.dto.BookingConfirmDTO;
import com.example.Backend.dto.SeatStatusResponse;
import com.example.Backend.model.Booking;
import com.example.Backend.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

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
