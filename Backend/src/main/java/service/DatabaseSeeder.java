package service;

import model.*;
import repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.sql.Timestamp;
import java.math.BigDecimal;

@Component
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired private UserRepository userRepository;
    @Autowired private OwnerRepository ownerRepository;
    @Autowired private DriverRepository driverRepository;
    @Autowired private BusRepository busRepository;
    @Autowired private RouteRepository routeRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if(userRepository.count() == 0) {
            String encodedPass = passwordEncoder.encode("password");

            // 1 Passenger
            User passUser = new User(null, "passenger@test.com", encodedPass, "John Doe", Role.PASSENGER, "1234567890", new Timestamp(System.currentTimeMillis()));
            userRepository.save(passUser);

            // 1 Owner
            User ownerUser = new User(null, "owner@test.com", encodedPass, "Bus Owner Inc", Role.OWNER, "0987654321", new Timestamp(System.currentTimeMillis()));
            userRepository.save(ownerUser);
            Owner owner = new Owner(null, ownerUser, "Fast Travels", "BL123", "TAX456", 4.8);
            ownerRepository.save(owner);

            // 1 Driver
            User driverUser = new User(null, "driver@test.com", encodedPass, "Jack Driver", Role.DRIVER, "5555555555", new Timestamp(System.currentTimeMillis()));
            userRepository.save(driverUser);
            Driver driver = new Driver(null, driverUser, "LIC-999", Date.valueOf("2030-12-31"), 5, true, 4.5);
            driverRepository.save(driver);

            // 1 Bus
            Bus bus = new Bus(null, owner, "REG-1234", "Volvo B11R", 40, true, new Timestamp(System.currentTimeMillis()));
            busRepository.save(bus);

            // 2 Routes
            Route r1 = new Route(null, "CBE", "Chennai", 500.0, new BigDecimal("500.00"), 480);
            routeRepository.save(r1);

            Route r2 = new Route(null, "Chennai", "Madurai", 450.0, new BigDecimal("400.00"), 400);
            routeRepository.save(r2);
        }
    }
}
