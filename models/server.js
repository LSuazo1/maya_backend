const express = require('express');
const cors = require('cors');
const { db } = require('../config/db');
const routeUsers = require('../routers/users.route');
const routeAuth = require('../routers/auth.route');
const routeItems = require('../routers/items.route');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.conectarDB();
    this.middleware();
    this.route();
  }

  async conectarDB() {
    try {
      await db.authenticate();
      console.log('data cargada');
    } catch (error) {
      console.log(error);
    }
  }

  middleware() {
    // cors
    this.app.use(cors());

    // Lectura ytt paraseo del body
    this.app.use(express.json());
  }

  route() {
    this.app.use('/auth', routeAuth);
    this.app.use('/users', routeUsers);
    this.app.use('/items', routeItems);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`express se esta corriendo por el servidor http://localhost:${this.port}`);
    });
  }
}
module.exports = Server;
