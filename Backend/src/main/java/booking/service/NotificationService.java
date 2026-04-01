package booking.service;

import booking.model.Booking;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {
    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

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
