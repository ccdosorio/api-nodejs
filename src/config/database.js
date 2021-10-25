const mysql = require("mysql");
require("dotenv").config();

var conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

conn.connect((err) => {
  if (err) {
    console.log("Database connection error");
  } else {
    console.log("Successful connection to the database");
  }
});

module.exports = conn;
