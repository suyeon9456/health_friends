const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  // "development": {
  //   "username": "root",
  //   "password": process.env.DB_PASSWORD,
  //   "database": "health-friends",
  //   "host": "127.0.0.1",
  //   "dialect": "mysql",
  //   "timezone": "+09:00",
  // },
  "development": {
    "username": "admin",
    "password": process.env.DB_PASSWORD,
    "database": "health-friends-db",
    "host": "health-friends-db.cdofxfi7sta7.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql",
    "timezone": "+09:00",
    "port": "3306"
  },
  "test": {
    "username": "root",
    "password": process.env.DB_PASSWORD,
    "database": "health-friends",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "admin",
    "password": process.env.DB_PASSWORD,
    "database": "health-friends-db",
    "host": "health-friends-db.cdofxfi7sta7.ap-northeast-2.rds.amazonaws.com",
    "dialect": "mysql"
  }
}
