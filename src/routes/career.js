const conn = require("../config/database");
const Service = require("../service");

module.exports = (app) => {
  app.get("/carreras", (req, res) => {
    let query = "SELECT * FROM carrera;";
    conn.query(query, (err, rows) => {
      if (err) res.status(500).json({ status: 1, message: err, data: [] });
      else res.json({ status: 0, message: "Ok", data: rows });
    });
  });
};
