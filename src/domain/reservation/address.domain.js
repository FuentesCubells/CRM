


class Address {

    constructor(data, user_id) {
        this.user_id = user_id;
        this.address = data.address;
        this.country = data.country;
        this.city = data.city;
        this.state = data.state;
        this.zip = data.zip;
    }

    validate() {
        if (!this.street || !this.city || !this.state || !this.zip) {
            throw new Error('Todos los campos son obligatorios');
        }
    }
}


module.exports = Address 

