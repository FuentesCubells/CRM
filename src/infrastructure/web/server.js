const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
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
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000,
            max: 100,
            standardHeaders: true,
            legacyHeaders: false,
            message: {
                status: 429,
                error: 'Demasiadas peticiones desde esta IP. Intenta más tarde.'
            }
        });

        this.app.use(limiter);
        // this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
    }

    routes() {
        this.app.use(this.paths.reservations, require("./routes/reservation.routes"));
        this.app.use(this.paths.auth, require("./routes/auth.routes"));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server