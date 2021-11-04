const conn = require("../config/database");
const Service = require("../service");

module.exports = (app) => {
  app.get("/schedules/:codigou", (req, res) => {
    let query = `select c.nombre, h.hinicio, h.hfinal, h.dia
    from horarios h, asignacion a, curso c
    where h.codigoa = a.codigoa
    and a.codigoc = c.codigoc
    and a.codigou = ${req.params.codigou};`;
    conn.query(query, (err, rows) => {
      if (err) res.status(500).json({ status: 1, message: err, data: [] });
      else res.json({ status: 0, message: "Ok", data: rows });
    });
  });
};
