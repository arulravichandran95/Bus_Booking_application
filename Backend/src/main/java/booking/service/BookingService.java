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

    @Transactional(readOnly = true)
    public booking.dto.PassengerBookingsDTO getPassengerBookings() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User passenger = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        java.util.List<Booking> bookings = bookingRepository.findByPassengerIdOrderByBookingTimestampDesc(passenger.getId());

        java.util.List<booking.dto.BookingSummaryDTO> upcoming = new java.util.ArrayList<>();
        java.util.List<booking.dto.BookingSummaryDTO> past = new java.util.ArrayList<>();

        for (Booking b : bookings) {
            booking.dto.BookingSummaryDTO dto = new booking.dto.BookingSummaryDTO();
            dto.setBookingId("BK" + b.getId());
            dto.setTripId(String.valueOf(b.getTrip().getId()));
            
            String busModel = b.getTrip().getBus().getModelName();
            dto.setBusName(busModel != null ? busModel : "Standard Express");
            dto.setSource(b.getTrip().getRoute().getFromCity());
            dto.setDestination(b.getTrip().getRoute().getToCity());
            dto.setDate(b.getTrip().getDepartureTime().toLocalDate().toString());
            dto.setDepartureTime(b.getTrip().getDepartureTime().toLocalTime().toString());
            dto.setSeats(b.getSeatStatus().getSeatNumber());
            dto.setAmount(b.getTotalPaid());
            dto.setStatus(b.getStatus());

            if ("CONFIRMED".equals(b.getStatus()) && b.getTrip().getDepartureTime().isAfter(LocalDateTime.now())) {
                upcoming.add(dto);
            } else {
                past.add(dto);
            }
        }

        return new booking.dto.PassengerBookingsDTO(upcoming, past);
    }

    @Transactional
    public java.util.Map<String, Object> cancelBooking(String bookingIdStr) {
        Long bookingId;
        try {
            bookingId = Long.parseLong(bookingIdStr.replace("BK", ""));
        } catch (NumberFormatException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid booking ID format");
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User passenger = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Booking not found"));

        if (!booking.getPassenger().getId().equals(passenger.getId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Booking does not belong to you");
        }

        if (!"CONFIRMED".equals(booking.getStatus())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Only confirmed bookings can be cancelled");
        }

        LocalDateTime departure = booking.getTrip().getDepartureTime();
        if (LocalDateTime.now().isAfter(departure.minusHours(24))) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "No cancellation should happen within 24 hours of departure.");
        }

        booking.setStatus("CANCELLED");
        bookingRepository.save(booking);

        SeatStatus seatStatus = booking.getSeatStatus();
        seatStatus.setStatus("AVAILABLE");
        seatStatus.setLockedByUser(null);
        seatStatus.setLockedAt(null);
        seatStatusRepository.save(seatStatus);

        return java.util.Map.of(
                "success", true,
                "message", "Booking " + bookingIdStr + " has been canceled successfully."
        );
    }
}
