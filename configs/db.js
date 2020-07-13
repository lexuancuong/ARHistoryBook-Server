let { Pool } = require("pg");

// Connect using connection string if available.
// Otherwise, connect using credentials.
let config = process.env.DATABASE_URL
  ? {
      connectionString: process.env.DATABASE_URL
    }
  : {
      // user: process.env.DB_USER,
      // host: process.env.DB_HOST,
      // database: process.env.DB_NAME,
      // password: process.env.DB_PASS,
      // port: process.env.DB_PORT

      user: 'cuong',//process.env.DB_USER,
      host: 'localhost',//process.env.DB_HOST,
      database: 'arbook',//process.env.DB_NAME,
      password: '123456',//process.env.DB_PASS,
      port: 5432 //|| process.env.DB_PORT
    };
let pool = new Pool(config);

module.exports = pool;
