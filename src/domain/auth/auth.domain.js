
class Auth {

    constructor(data) {
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.phone = data.phone;
        this.password_hash = data.password;
        this.role = 'client';
        this.created_at = new Date();
    }
}

module.exports = Auth;