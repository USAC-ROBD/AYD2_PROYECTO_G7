// db_connection.mjs
import config from './configurations.mjs';
import mysql from 'mysql2/promise';

class DBConnection {
  constructor() {
    if (!DBConnection.instance) {
      DBConnection.instance = mysql.createPool({
        host: config.host_db,
        port: config.port_db,
        user: config.user,
        password: config.password,
        database: config.name_db,
      });
    }
  }

  getInstance() {
    return DBConnection.instance;
  }
}

const db = new DBConnection().getInstance();
export default db;
