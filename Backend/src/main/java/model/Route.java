package model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

@Entity
@Table(name = "routes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String from_city;

    @Column(nullable = false)
    private String to_city;

    private Double distance_km;

    @Column(nullable = false)
    private BigDecimal base_price;

    private Integer estimated_duration_minutes;
}
