package service;

import dto.RouteSearchDTO;
import model.Route;
import repository.RouteRepository;
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
            dto.setPrice(r.getBase_price());
            dto.setTripHealthScore(96);
            dto.setDepartureTime(date + "T08:00:00");
            return dto;
        }).collect(Collectors.toList());
    }
}
