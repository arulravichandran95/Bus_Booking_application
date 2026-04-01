package booking.controller;

import booking.dto.RouteSearchDTO;
import booking.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/routes")
public class RouteController {

    @Autowired
    private RouteService routeService;

    @GetMapping("/search")
    public ResponseEntity<List<RouteSearchDTO>> searchRoutes(
            @RequestParam("from") String from,
            @RequestParam("to") String to,
            @RequestParam("date") String date) {
        
        List<RouteSearchDTO> results = routeService.searchRoutes(from, to, date);
        return ResponseEntity.ok(results);
    }

    @GetMapping("/trip/{id}/status")
    public ResponseEntity<java.util.Map<String, String>> getTripStatus(@PathVariable("id") Long tripId) {
        String status = routeService.getTripStatus(tripId);
        return ResponseEntity.ok(java.util.Map.of("status", status));
    }
}
