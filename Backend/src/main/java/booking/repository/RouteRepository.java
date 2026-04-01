package booking.repository;

import booking.model.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RouteRepository extends JpaRepository<Route, Long> {
    List<Route> findByFromCityAndToCity(String fromCity, String toCity);
}
