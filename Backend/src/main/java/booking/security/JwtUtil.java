package booking.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
    // Hardcoded 256-bit secret key used to cryptographically sign and verify JWT tokens
    private final Key key = Keys.hmacShaKeyFor("a_very_long_secure_secret_key_123456789".getBytes());

    // Generates a newly minted JWT token for the successfully authenticated user's email
    public String generateToken(String email) {
        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                // Token validity is configured here to be 10 hours from generation time
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Retrieves the subject (which we set to the user email) out of the token payload
    public String extractUsername(String token) {
        return parseClaims(token).getSubject();
    }

    // Validates whether the token mathematically checks out, belongs to the user, and hasn't expired
    public boolean isTokenValid(String token, String userEmail) {
        String username = extractUsername(token);
        return (username.equals(userEmail) && !isTokenExpired(token));
    }

    // Internally checks the token's expiration date from the payload Claims
    private boolean isTokenExpired(String token) {
        return parseClaims(token).getExpiration().before(new Date());
    }

    // Helper method to parse out the Claims (data payload) safely using our secret key
    private Claims parseClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
