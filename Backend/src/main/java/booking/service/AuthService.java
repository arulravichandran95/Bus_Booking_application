package booking.service;

import booking.dto.AuthResponse;
import booking.dto.LoginRequest;
import booking.model.User;

import booking.repository.UserRepository;
import booking.security.JwtUtil;
import booking.dto.RegisterRequest;
import booking.model.Role;
import java.sql.Timestamp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse login(LoginRequest request) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        if (auth.isAuthenticated()) {
            User user = userRepository.findByEmail(request.getUsername())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            String token = jwtUtil.generateToken(user.getEmail());
            return new AuthResponse(token, user.getRole().name(), user.getId());
        }
        throw new BadCredentialsException("Invalid credentials");
    }

    public void register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email is already registered.");
        }

        User newUser = new User();
        newUser.setEmail(request.getEmail());
        newUser.setFullName(request.getFullName() != null ? request.getFullName() : extractNameFromEmail(request.getEmail()));
        newUser.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        
        // Default role safety check
        Role assignedRole = request.getRole() != null ? request.getRole() : Role.PASSENGER;
        newUser.setRole(assignedRole);
        
        newUser.setCreatedAt(new Timestamp(System.currentTimeMillis()));

        userRepository.save(newUser);
    }

    private String extractNameFromEmail(String email) {
        if (email != null && email.contains("@")) {
            return email.substring(0, email.indexOf("@"));
        }
        return "User";
    }
}
