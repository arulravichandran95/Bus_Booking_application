package com.example.Backend.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingConfirmDTO {

    private Long lockId;

    private PassengerDetails passengerDetails;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PassengerDetails {

        private String name;

        private String phone;
    }
}
