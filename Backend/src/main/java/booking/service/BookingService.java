package booking.service;

import booking.dto.BookingConfirmDTO;
import booking.model.Booking;
import booking.model.SeatStatus;
import booking.model.User;
import booking.repository.BookingRepository;
import booking.repository.SeatStatusRepository;
import booking.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.UUID;

@Service
public class BookingService {

    private static final Logger log = LoggerFactory.getLogger(BookingService.class);

    private final BookingRepository bookingRepository;
    private final SeatStatusRepository seatStatusRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public BookingService(BookingRepository bookingRepository,
                          SeatStatusRepository seatStatusRepository,
                          UserRepository userRepository,
                          NotificationService notificationService) {
        this.bookingRepository = bookingRepository;
        this.seatStatusRepository = seatStatusRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    @Transactional
    public Booking confirmBooking(BookingConfirmDTO confirmDTO) {
        if (confirmDTO.getLockId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Lock ID cannot be null");
        }
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User passenger = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        SeatStatus seatStatus = seatStatusRepository.findByIdWithLock(confirmDTO.getLockId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Lock not found"));

        if (!"LOCKED".equals(seatStatus.getStatus())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Seat is not in LOCKED state. Current state: " + seatStatus.getStatus());
        }

        if (seatStatus.getLockedByUser() == null || !seatStatus.getLockedByUser().getId().equals(passenger.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "This lock does not belong to the authenticated user");
        }

        LocalDateTime lockExpiry = seatStatus.getLockedAt().plusMinutes(3);
        if (LocalDateTime.now().isAfter(lockExpiry)) {
            seatStatus.setStatus("AVAILABLE");
            seatStatus.setLockedByUser(null);
            seatStatus.setLockedAt(null);
            seatStatusRepository.save(seatStatus);
            throw new ResponseStatusException(HttpStatus.GONE, "Lock has expired. Please lock the seat again.");
        }

        seatStatus.setStatus("BOOKED");
        seatStatusRepository.save(seatStatus);

        String qrCodeString = generateQrCodeString(seatStatus, passenger, confirmDTO);

        Booking booking = Booking.builder()
                .passenger(passenger)
                .trip(seatStatus.getTrip())
                .seatStatus(seatStatus)
                .bookingTimestamp(LocalDateTime.now())
                .totalPaid(BigDecimal.ZERO)
                .qrCodeString(qrCodeString)
                .tripHealthScoreSnapshot(null)
                .status("CONFIRMED")
                .build();

        Booking savedBooking = bookingRepository.save(booking);

        if (savedBooking != null) {
            notificationService.sendBookingConfirmation(savedBooking);
            log.info("Booking confirmed: BK{} for passenger {} on trip {} seat {}",
                    savedBooking.getId(),
                    passenger.getId(),
                    seatStatus.getTrip().getId(),
                    seatStatus.getSeatNumber());
        }

        return savedBooking;
    }

    private String generateQrCodeString(SeatStatus seatStatus, User passenger, BookingConfirmDTO confirmDTO) {
        String rawData = String.format("BUSSYNC|TRIP:%d|SEAT:%s|PAX:%s|PHONE:%s|TS:%s|REF:%s",
                seatStatus.getTrip().getId(),
                seatStatus.getSeatNumber(),
                confirmDTO.getPassengerDetails().getName(),
                confirmDTO.getPassengerDetails().getPhone(),
                LocalDateTime.now(),
                UUID.randomUUID().toString().substring(0, 8).toUpperCase()
        );
        return Base64.getEncoder().encodeToString(rawData.getBytes(StandardCharsets.UTF_8));
    }
}
