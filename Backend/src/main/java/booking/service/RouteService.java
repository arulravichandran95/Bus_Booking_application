package booking.service;

import booking.dto.RouteSearchDTO;
import booking.model.Route;
import booking.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RouteService {

    @Autowired
    private RouteRepository routeRepository;

    public List<RouteSearchDTO> searchRoutes(String fromCity, String toCity, String date) {
        List<Route> routes = routeRepository.findByFromCityAndToCity(fromCity, toCity);
        
        return routes.stream().map(r -> {
            RouteSearchDTO dto = new RouteSearchDTO();
            dto.setTripId(r.getId());
            dto.setBusName("Express");
            dto.setPrice(r.getBasePrice());
            dto.setTripHealthScore(96);
            dto.setDepartureTime(date + "T08:00:00");
            return dto;
        }).collect(Collectors.toList());
    }

    @Autowired
    private booking.repository.TripRepository tripRepository;

    public String getTripStatus(Long tripId) {
        return tripRepository.findById(tripId)
                .map(booking.model.Trip::getStatus)
                .orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                        org.springframework.http.HttpStatus.NOT_FOUND, "Trip not found"));
    }
}
