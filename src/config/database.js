// const mysql = require("mysql");
// require("dotenv").config();

// var conn = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   port: process.env.DB_PORT,
//   password: process.env.DB_PASS,
//   database: process.env.DB_DATABASE,
// });

// conn.connect((err) => {
//   if (err) {
//     console.log("Database connection error");
//   } else {
//     console.log("Successful connection to the database");
//   }
// });

// module.exports = conn;
const mysql2 = require("mysql2/promise");
require("dotenv").config();

var conn = mysql2.createPool({
  connectionLimit: 15,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

async function getPool() {
  const connection = await conn.getConnection();
  try {
    const data = await connection.query("SELECT 1 + 1 AS solution");
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  try {
    const results = await getPool();
    console.log("The solution is: " + results[0][0].solution);
  } catch (error) {
    console.log(error);
  }
}

main();

module.exports = conn;
