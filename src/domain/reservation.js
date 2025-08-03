



class Reservation {

    constructor(data) {
        this.first_name = data.first_name;
        this.email = data.email;
        this.phone = data.phone;
        this.check_in = new Date(data.check_in);
        this.check_out = new Date(data.check_out);
        this.rate_per_night = data.ratePerNight;
        this.room_id = data.room_id;
        this.address = data.address;
        this.country = data.country;
        this.city = data.city;
        this.state = data.state;
        this.zip = data.zip;
        this.adults = data.adults;
        this.children = data.children;
        this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
        this.total_price = this.getTotalPrice();
    }

    getTotalPrice() {
        const nights = Math.ceil((this.check_out - this.check_in) / (1000 * 60 * 60 * 24));
        return this.rate_per_night * nights;
    }

    validate() {
        if (this.check_in >= this.check_out) throw new Error("Check-in debe ser antes de Check-out");
        if (!this.first_name || !this.email || !this.phone) throw new Error("Campos requeridos");
        if (this.adults <= 0) throw new Error("Debe haber al menos un adulto");
    }
}

module.exports = Reservation;