const mysql = require("mysql");

var conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "root",
  database: "FAW",
});

conn.connect((err) => {
  if (err) {
    console.log("Error en conección de Base de Datos");
  } else {
    console.log("Conexión exitosa");
  }
});

module.exports = conn;
