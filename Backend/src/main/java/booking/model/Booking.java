package booking.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;


@Entity
@Table(name = "booking")
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

    public Booking() {}

    public Booking(Long id, User passenger, Trip trip, SeatStatus seatStatus, LocalDateTime bookingTimestamp, BigDecimal totalPaid, String qrCodeString, Double tripHealthScoreSnapshot, String status) {
        this.id = id;
        this.passenger = passenger;
        this.trip = trip;
        this.seatStatus = seatStatus;
        this.bookingTimestamp = bookingTimestamp;
        this.totalPaid = totalPaid;
        this.qrCodeString = qrCodeString;
        this.tripHealthScoreSnapshot = tripHealthScoreSnapshot;
        this.status = status;
    }

    public static BookingBuilder builder() {
        return new BookingBuilder();
    }

    public static class BookingBuilder {
        private Long id;
        private User passenger;
        private Trip trip;
        private SeatStatus seatStatus;
        private LocalDateTime bookingTimestamp;
        private BigDecimal totalPaid;
        private String qrCodeString;
        private Double tripHealthScoreSnapshot;
        private String status;

        BookingBuilder() {}

        public BookingBuilder id(Long id) { this.id = id; return this; }
        public BookingBuilder passenger(User passenger) { this.passenger = passenger; return this; }
        public BookingBuilder trip(Trip trip) { this.trip = trip; return this; }
        public BookingBuilder seatStatus(SeatStatus seatStatus) { this.seatStatus = seatStatus; return this; }
        public BookingBuilder bookingTimestamp(LocalDateTime bookingTimestamp) { this.bookingTimestamp = bookingTimestamp; return this; }
        public BookingBuilder totalPaid(BigDecimal totalPaid) { this.totalPaid = totalPaid; return this; }
        public BookingBuilder qrCodeString(String qrCodeString) { this.qrCodeString = qrCodeString; return this; }
        public BookingBuilder tripHealthScoreSnapshot(Double tripHealthScoreSnapshot) { this.tripHealthScoreSnapshot = tripHealthScoreSnapshot; return this; }
        public BookingBuilder status(String status) { this.status = status; return this; }

        public Booking build() {
            return new Booking(id, passenger, trip, seatStatus, bookingTimestamp, totalPaid, qrCodeString, tripHealthScoreSnapshot, status);
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getPassenger() { return passenger; }
    public void setPassenger(User passenger) { this.passenger = passenger; }

    public Trip getTrip() { return trip; }
    public void setTrip(Trip trip) { this.trip = trip; }

    public SeatStatus getSeatStatus() { return seatStatus; }
    public void setSeatStatus(SeatStatus seatStatus) { this.seatStatus = seatStatus; }

    public LocalDateTime getBookingTimestamp() { return bookingTimestamp; }
    public void setBookingTimestamp(LocalDateTime bookingTimestamp) { this.bookingTimestamp = bookingTimestamp; }

    public BigDecimal getTotalPaid() { return totalPaid; }
    public void setTotalPaid(BigDecimal totalPaid) { this.totalPaid = totalPaid; }

    public String getQrCodeString() { return qrCodeString; }
    public void setQrCodeString(String qrCodeString) { this.qrCodeString = qrCodeString; }

    public Double getTripHealthScoreSnapshot() { return tripHealthScoreSnapshot; }
    public void setTripHealthScoreSnapshot(Double tripHealthScoreSnapshot) { this.tripHealthScoreSnapshot = tripHealthScoreSnapshot; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
