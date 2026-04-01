package booking.service;

import booking.model.SeatStatus;
import booking.model.User;
import booking.repository.SeatStatusRepository;
import booking.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SeatLockService {

    private static final Logger log = LoggerFactory.getLogger(SeatLockService.class);

    private final SeatStatusRepository seatStatusRepository;
    private final UserRepository userRepository;

    public SeatLockService(SeatStatusRepository seatStatusRepository, UserRepository userRepository) {
        this.seatStatusRepository = seatStatusRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public SeatStatus lockSeat(Long tripId, String seatNumber) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        SeatStatus seatStatus = seatStatusRepository.findByTripIdAndSeatNumberWithLock(tripId, seatNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Seat not found for this trip"));

        if (!"AVAILABLE".equals(seatStatus.getStatus())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Seat already locked/booked");
        }

        seatStatus.setStatus("LOCKED");
        seatStatus.setLockedByUser(user);
        seatStatus.setLockedAt(LocalDateTime.now());

        return seatStatusRepository.save(seatStatus);
    }

    @Scheduled(fixedRate = 60000)
    @Transactional
    public void releaseExpiredLocks() {
        LocalDateTime expiryThreshold = LocalDateTime.now().minusMinutes(3);
        List<SeatStatus> expiredLocks = seatStatusRepository.findExpiredLocks(expiryThreshold);

        if (!expiredLocks.isEmpty()) {
            log.info("Releasing {} expired seat locks", expiredLocks.size());
            for (SeatStatus seat : expiredLocks) {
                seat.setStatus("AVAILABLE");
                seat.setLockedByUser(null);
                seat.setLockedAt(null);
                seatStatusRepository.save(seat);
                log.info("Released lock on seat {} for trip {}", seat.getSeatNumber(), seat.getTrip().getId());
            }
        }
    }

    @Transactional(readOnly = true)
    public List<booking.dto.SeatStatusDTO> getSeatStatusMap(Long tripId) {
        return seatStatusRepository.findByTripId(tripId)
                .stream()
                .map(seat -> new booking.dto.SeatStatusDTO(seat.getSeatNumber(), seat.getStatus()))
                .toList();
    }
}
