package booking.model;

import jakarta.persistence.*;


@Entity
@Table(name = "drivers")
public class Driver {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "license_number", nullable = false)
    private String licenseNumber;

    @Column(name = "license_expiry", nullable = false)
    private java.sql.Date licenseExpiry;

    @Column(name = "experience_years")
    private Integer experienceYears;

    @Column(name = "is_verified")
    private Boolean isVerified;

    private Double rating;

    public Driver() {}

    public Driver(Long id, User user, String licenseNumber, java.sql.Date licenseExpiry, Integer experienceYears, Boolean isVerified, Double rating) {
        this.id = id;
        this.user = user;
        this.licenseNumber = licenseNumber;
        this.licenseExpiry = licenseExpiry;
        this.experienceYears = experienceYears;
        this.isVerified = isVerified;
        this.rating = rating;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getLicenseNumber() { return licenseNumber; }
    public void setLicenseNumber(String licenseNumber) { this.licenseNumber = licenseNumber; }

    public java.sql.Date getLicenseExpiry() { return licenseExpiry; }
    public void setLicenseExpiry(java.sql.Date licenseExpiry) { this.licenseExpiry = licenseExpiry; }

    public Integer getExperienceYears() { return experienceYears; }
    public void setExperienceYears(Integer experienceYears) { this.experienceYears = experienceYears; }

    public Boolean getIsVerified() { return isVerified; }
    public void setIsVerified(Boolean isVerified) { this.isVerified = isVerified; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
}
