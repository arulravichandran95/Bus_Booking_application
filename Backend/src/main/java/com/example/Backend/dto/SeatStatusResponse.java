package com.example.Backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatStatusResponse {

    private Long lockId;

    private String bookingId;

    private String qrCode;

    private String message;
}
