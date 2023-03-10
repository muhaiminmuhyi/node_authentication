const { Sequelize } = require('sequelize');

const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_INSTANCE = process.env.DB_INSTANCE;

// const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
//   host: `/cloudsql/${process.env.DB_INSTANCE}`,
//   dialect: 'postgres',
//   dialectOptions: {
//     socketPath: `/cloudsql/${DB_INSTANCE}`,
//   },
// });

module.exports = {
  development: {
    dialect: 'postgres',
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: `/cloudsql/${DB_INSTANCE}`,
    logging: false,
    dialectOptions: {
      socketPath: `/cloudsql/${DB_INSTANCE}`
    }
  }
}
