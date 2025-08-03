require('dotenv').config();
const Server = require('./src/infrastructure/web/server');

const PORT = process.env.PORT || 3000;
const server = new Server();
server.listen();
