const conn = require("../config/database");
const Service = require("../service");

module.exports = (app) => {
  app.get("/asignaciones", Service.verify, (req, res) => {
    let query = `SELECT a.codigoa, a.codigou, a.codigoc, CONCAT(u.nombre,' ',u.apellido) AS alumno, 
                u.carnet, c.codigoc, c.nombre AS curso
                FROM asignacion a
                INNER JOIN usuario u ON(a.codigou = u.codigou)
                INNER JOIN curso c ON(a.codigoc = c.codigoc);`;
    conn.query(query, (err, rows) => {
      if (err) res.status(500).json({ status: 1, message: "Error", data: [] });
      else res.json({ status: 0, message: "Ok", data: rows });
    });
  });

  app.get("/asignaciones/:codigou", Service.verify, (req, res) => {
    let query = `SELECT a.codigoa, a.codigou, a.codigoc, CONCAT(u.nombre,' ',u.apellido) AS alumno, 
                u.carnet, c.codigoc, c.nombre AS curso
                FROM asignacion a
                INNER JOIN usuario u ON(a.codigou = u.codigou)
                INNER JOIN curso c ON(a.codigoc = c.codigoc)
                WHERE a.codigou = ${req.params.codigou};`;
    conn.query(query, (err, rows) => {
      if (err) {
        res.status(500).json({ status: 1, message: "Error", data: [] });
      } else {
        if (rows.length > 0) {
          res.json({ status: 0, message: "Ok", data: rows });
        } else {
          res.status(404).json({
            status: 1,
            message: "El alumno no tiene asignaciones",
            data: [],
          });
        }
      }
    });
  });

  app.post("/asignaciones", Service.verify, (req, res) => {
    let body = {
      codigou: req.body.codigou,
      codigoc: req.body.codigoc,
    };
    let query = `INSERT INTO asignacion(codigou, codigoc) VALUES (?,?);`;
    conn.query(query, [body.codigou, body.codigoc], (err, rows) => {
      if (err) res.status(500).json({ status: 1, message: "Error" });
      else
        res.json({
          status: 0,
          message: "Asignación creado exitosamente",
        });
    });
  });
};
