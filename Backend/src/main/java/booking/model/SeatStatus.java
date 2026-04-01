package booking.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "seat_status", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"trip_id", "seat_number"})
})
public class SeatStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(name = "seat_number", nullable = false)
    private String seatNumber;

    @Column(name = "status", nullable = false)
    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "locked_by_user_id")
    private User lockedByUser;

    @Column(name = "locked_at")
    private LocalDateTime lockedAt;

    public SeatStatus() {}

    public SeatStatus(Long id, Trip trip, String seatNumber, String status, User lockedByUser, LocalDateTime lockedAt) {
        this.id = id;
        this.trip = trip;
        this.seatNumber = seatNumber;
        this.status = status;
        this.lockedByUser = lockedByUser;
        this.lockedAt = lockedAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Trip getTrip() { return trip; }
    public void setTrip(Trip trip) { this.trip = trip; }

    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public User getLockedByUser() { return lockedByUser; }
    public void setLockedByUser(User lockedByUser) { this.lockedByUser = lockedByUser; }

    public LocalDateTime getLockedAt() { return lockedAt; }
    public void setLockedAt(LocalDateTime lockedAt) { this.lockedAt = lockedAt; }
}
