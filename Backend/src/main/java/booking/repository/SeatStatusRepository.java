package booking.repository;

import booking.model.SeatStatus;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface SeatStatusRepository extends JpaRepository<SeatStatus, Long> {

    long countByTripId(Long tripId);
    
    long countByTripIdAndStatus(Long tripId, String status);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM SeatStatus s WHERE s.trip.id = :tripId AND s.seatNumber = :seatNumber")
    Optional<SeatStatus> findByTripIdAndSeatNumberWithLock(
            @Param("tripId") Long tripId,
            @Param("seatNumber") String seatNumber
    );

    @Query("SELECT s FROM SeatStatus s WHERE s.status = 'LOCKED' AND s.lockedAt < :expiryTime")
    List<SeatStatus> findExpiredLocks(@Param("expiryTime") LocalDateTime expiryTime);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT s FROM SeatStatus s WHERE s.id = :lockId")
    Optional<SeatStatus> findByIdWithLock(@Param("lockId") Long lockId);
}
