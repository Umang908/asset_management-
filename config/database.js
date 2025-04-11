require('dotenv').config();
const { Sequelize } = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_DATABASE, // database name
  process.env.DB_USER,      // username
  process.env.DB_PASSWORD,  // password
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: true, // set to true if you want SQL logs
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

// Test connection
sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL connected via Sequelize...');
  })
  .catch((err) => {
    console.error('❌ Unable to connect to the database:', err);
  });

module.exports = sequelize;
