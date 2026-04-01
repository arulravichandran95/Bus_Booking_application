package com.example.Backend.service;

import com.example.Backend.model.Booking;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NotificationService {

    public void sendBookingConfirmation(Booking booking) {
        String formattedMessage = String.format(
                "\n========================================\n" +
                "  EMAIL SENT: Ticket Confirmed\n" +
                "========================================\n" +
                "  Booking ID   : BK%d\n" +
                "  Passenger ID : %d\n" +
                "  Trip ID      : %d\n" +
                "  Seat          : %s\n" +
                "  QR Code      : %s\n" +
                "  Booked At    : %s\n" +
                "  Status       : %s\n" +
                "========================================\n",
                booking.getId(),
                booking.getPassenger().getId(),
                booking.getTrip().getId(),
                booking.getSeatStatus().getSeatNumber(),
                booking.getQrCodeString(),
                booking.getBookingTimestamp(),
                booking.getStatus()
        );
        log.info(formattedMessage);
    }
}
