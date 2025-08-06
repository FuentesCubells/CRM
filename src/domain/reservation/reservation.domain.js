const Address = require("./address.domain");

class Reservation {
    constructor(data) {
        this.client = data.client;
        this.address = new Address(data.address, data.client.user_id);
        this.booking_details = {
            room_id: data.booking_details.room_id,
            user_id: data.client.user_id,
            check_in: new Date(data.booking_details.check_in),
            check_out: new Date(data.booking_details.check_out),
            adults: data.booking_details.adults || 1,
            children: data.booking_details.children || 0,
            rate_per_night: data.booking_details.rate_per_night,
            created_at: new Date(),
        }

        this.booking_details.total = this.calculateTotal();
    }

    calculateTotal() {
        const nights = Math.ceil(
            (this.booking_details.check_out - this.booking_details.check_in) / (1000 * 60 * 60 * 24)
        );
        return nights * this.booking_details.rate_per_night;
    }
}

module.exports = Reservation;
