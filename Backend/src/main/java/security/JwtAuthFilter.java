package security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        // Extract the Authorization header containing the specific Bearer token
        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        // Check if the header contains a Bearer token
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                // Parse the JWT to acquire the subject (email/username)
                username = jwtUtil.extractUsername(token);
            } catch (Exception e) {
                // Token parsing errors are ignored; execution continues unauthenticated
            }
        }

        // Proceed if we extracted a username but there isn't an existing authenticated session Context
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            
            // Load the user from the database or UserDetailsService implementation
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // Verify if the token matches the user details and hasn't expired yet
            if (jwtUtil.isTokenValid(token, userDetails.getUsername())) {
                
                // Create an Authentication token populated with the authorities (roles)
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                
                // Track details from the current request (e.g., remote IP, session details)
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Save this authentication token into the SecurityContext
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        
        // Handover to the next filter in the security chain
        filterChain.doFilter(request, response);
    }
}
