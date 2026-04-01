package booking.controller;

import booking.dto.SeatLockRequest;
import booking.dto.SeatStatusResponse;
import booking.model.SeatStatus;
import booking.service.SeatLockService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/seats")
public class SeatController {

    private final SeatLockService seatLockService;

    public SeatController(SeatLockService seatLockService) {
        this.seatLockService = seatLockService;
    }

    @PostMapping("/lock")
    public ResponseEntity<?> lockSeat(@RequestBody SeatLockRequest request) {
        try {
            SeatStatus lockedSeat = seatLockService.lockSeat(request.getTripId(), request.getSeatNumber());

            SeatStatusResponse response = SeatStatusResponse.builder()
                    .lockId(lockedSeat.getId())
                    .message("Seat locked for 3 minutes")
                    .build();

            return ResponseEntity.status(HttpStatus.CREATED).body(response);

        } catch (ResponseStatusException ex) {
            if (ex.getStatusCode() == HttpStatus.CONFLICT) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body(Map.of("message", "Seat already locked/booked"));
            }
            throw ex;
        }
    }

    @GetMapping("/status")
    public ResponseEntity<java.util.List<booking.dto.SeatStatusDTO>> getSeatStatus(@RequestParam("tripId") Long tripId) {
        java.util.List<booking.dto.SeatStatusDTO> statusMap = seatLockService.getSeatStatusMap(tripId);
        return ResponseEntity.ok(statusMap);
    }
}
