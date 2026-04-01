package booking.model;

import jakarta.persistence.*;

@Entity
@Table(name = "owners")
public class Owner {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "company_name")
    private String companyName;

    @Column(name = "business_license_no")
    private String businessLicenseNo;

    @Column(name = "tax_id")
    private String taxId;

    private Double rating;

    public Owner() {}

    public Owner(Long id, User user, String companyName, String businessLicenseNo, String taxId, Double rating) {
        this.id = id;
        this.user = user;
        this.companyName = companyName;
        this.businessLicenseNo = businessLicenseNo;
        this.taxId = taxId;
        this.rating = rating;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getBusinessLicenseNo() { return businessLicenseNo; }
    public void setBusinessLicenseNo(String businessLicenseNo) { this.businessLicenseNo = businessLicenseNo; }

    public String getTaxId() { return taxId; }
    public void setTaxId(String taxId) { this.taxId = taxId; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }
}
