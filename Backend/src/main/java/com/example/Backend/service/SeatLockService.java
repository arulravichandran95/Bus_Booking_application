package com.example.Backend.service;

import com.example.Backend.model.SeatStatus;
import com.example.Backend.model.User;
import com.example.Backend.repository.SeatStatusRepository;
import com.example.Backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@RequiredArgsConstructor
@Slf4j
public class SeatLockService {

    private final SeatStatusRepository seatStatusRepository;
    private final UserRepository userRepository;

    @Transactional
    public SeatStatus lockSeat(Long tripId, String seatNumber) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        User user = userRepository.findByUsername(username)
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
}
