package com.example.Backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatLockRequest {

    private Long tripId;

    private String seatNumber;
}
