package booking.dto;

public class BookingConfirmDTO {

    private Long lockId;
    private PassengerDetails passengerDetails;

    public BookingConfirmDTO() {}

    public BookingConfirmDTO(Long lockId, PassengerDetails passengerDetails) {
        this.lockId = lockId;
        this.passengerDetails = passengerDetails;
    }

    public static BookingConfirmDTOBuilder builder() {
        return new BookingConfirmDTOBuilder();
    }

    public static class BookingConfirmDTOBuilder {
        private Long lockId;
        private PassengerDetails passengerDetails;

        BookingConfirmDTOBuilder() {}

        public BookingConfirmDTOBuilder lockId(Long lockId) { this.lockId = lockId; return this; }
        public BookingConfirmDTOBuilder passengerDetails(PassengerDetails passengerDetails) { this.passengerDetails = passengerDetails; return this; }

        public BookingConfirmDTO build() {
            return new BookingConfirmDTO(lockId, passengerDetails);
        }
    }

    public Long getLockId() { return lockId; }
    public void setLockId(Long lockId) { this.lockId = lockId; }

    public PassengerDetails getPassengerDetails() { return passengerDetails; }
    public void setPassengerDetails(PassengerDetails passengerDetails) { this.passengerDetails = passengerDetails; }

    public static class PassengerDetails {
        private String name;
        private String phone;

        public PassengerDetails() {}

        public PassengerDetails(String name, String phone) {
            this.name = name;
            this.phone = phone;
        }

        public static PassengerDetailsBuilder builder() {
            return new PassengerDetailsBuilder();
        }

        public static class PassengerDetailsBuilder {
            private String name;
            private String phone;

            PassengerDetailsBuilder() {}

            public PassengerDetailsBuilder name(String name) { this.name = name; return this; }
            public PassengerDetailsBuilder phone(String phone) { this.phone = phone; return this; }

            public PassengerDetails build() {
                return new PassengerDetails(name, phone);
            }
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
    }
}
