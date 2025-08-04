
class Auth {

    constructor(data) {
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.password_hash = data.password;
        this.role = data.role || 'client';
        this.registration_date = new Date();
        this.active = data.active !== undefined ? data.active : true;
    }
}

module.exports = Auth;