const express = require('express');
const dbPool = require('../db/mysql');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.SERVER_PORT || 3000;

        this.paths = {
            reservations: '/api/reservations',
            auth: '/api/auth',
        }

        this.connectDB();
        this.middlewares();
        this.routes();
    }


    async connectDB() {
        try {
            this.dbConnection = await dbPool.getConnection();
        } catch (error) {
            console.log('Error connecting w¡th to the db', error)
        }
    }

    middlewares() {
        // this.app.use(cors());
        this.app.use(express.json())
    }

    routes() {
        this.app.use(this.paths.reservations, require('./routes/reservations'));
        this.app.use(this.paths.auth, require('./routes/auth'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server