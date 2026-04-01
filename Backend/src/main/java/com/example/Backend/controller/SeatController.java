package com.example.Backend.controller;

import com.example.Backend.dto.SeatLockRequest;
import com.example.Backend.dto.SeatStatusResponse;
import com.example.Backend.model.SeatStatus;
import com.example.Backend.service.SeatLockService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/seats")
@RequiredArgsConstructor
public class SeatController {

    private final SeatLockService seatLockService;

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
}
