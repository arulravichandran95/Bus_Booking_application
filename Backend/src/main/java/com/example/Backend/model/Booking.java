package com.example.Backend.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "passenger_id", nullable = false)
    private User passenger;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seat_status_id", nullable = false)
    private SeatStatus seatStatus;

    @Column(name = "booking_timestamp", nullable = false)
    private LocalDateTime bookingTimestamp;

    @Column(name = "total_paid", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalPaid;

    @Column(name = "qr_code_string", nullable = false)
    private String qrCodeString;

    @Column(name = "trip_health_score_snapshot")
    private Double tripHealthScoreSnapshot;

    @Column(name = "status", nullable = false)
    private String status;
}
