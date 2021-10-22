const conn = require("../config/database");

module.exports = (app) => {
  app.get("/cursos", async (req, res) => {
    let query = "SELECT * FROM curso;";
    const connection = await conn.getConnection();
    const data = await connection.query(query);
    let results = data[0];

    try {
      return res.json({ status: 0, message: "Ok", data: results });
    } catch (error) {
      res.status(500).json(err);
    }

    // connection.query(query, (err, rows) => {
    //   if (err) res.status(500).json({ status: 1, message: err, data: [] });
    //   else res.json({ status: 0, message: "Ok", data: rows });
    // });
  });
};
