package booking.repository;

import booking.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByTripIdAndStatus(Long tripId, String status);

    @Query("SELECT SUM(b.totalPaid) FROM Booking b WHERE b.trip.id = :tripId AND b.status = :status")
    Double sumRevenueByTripIdAndStatus(@Param("tripId") Long tripId, @Param("status") String status);
}
