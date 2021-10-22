const conn = require("../config/database");

module.exports = (app) => {
  app.get("/usuarios", (req, res) => {
    let query = "SELECT * FROM usuario;";
    conn.query(query, (err, rows) => {
      if (err) res.status(500).json({ status: 1, message: "Error", data: [] });
      else res.json({ status: 0, message: "Ok", data: rows });
    });
  });

  app.get("/usuarios/:codigou", (req, res) => {
    let query = `SELECT * FROM usuario WHERE codigou = ${req.params.codigou};`;
    conn.query(query, (err, rows) => {
      if (err) {
        res.status(500).json({ status: 1, message: "Error", data: [] });
      } else {
        if (rows.length > 0) {
          res.json({ status: 0, message: "OK", data: rows });
        } else {
          res
            .status(404)
            .json({ status: 1, message: "Usuario no encontrado", data: [] });
        }
      }
    });
  });

  app.post("/usuarios", (req, res) => {
    let body = {
      carnet: req.body.carnet,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      user: req.body.user,
      idc: req.body.idc,
      codigot: req.body.codigot,
      password: req.body.password,
      email: req.body.email,
    };
    let query = `INSERT INTO usuario(carnet, nombre, apellido, user, idc, codigot, password, email) 
                    VALUES (?,?,?,?,?,?,?,?);`;
    conn.query(
      query,
      [
        body.carnet,
        body.nombre,
        body.apellido,
        body.user,
        body.idc,
        body.codigot,
        body.password,
        body.email,
      ],
      (err, rows) => {
        if (err) res.status(500).json({ status: 1, message: "Error" });
        else
          res.json({
            status: 0,
            message: "Usuario creado exitosamente",
          });
      }
    );
  });

  app.put("/usuarios/:codigou", (req, res) => {
    let body = {
      codigou: req.params.codigou,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      user: req.body.user,
    };
    let query = `UPDATE usuario SET nombre = ?, apellido = ?, user = ? WHERE codigou = ?;`;
    conn.query(
      query,
      [body.nombre, body.apellido, body.user, body.codigou],
      (err) => {
        if (err) res.status(500).json({ status: 1, message: err });
        else res.json({ status: 0, message: "Usuario editado correctamente" });
      }
    );
  });

  app.delete("/usuarios/:codigou", (req, res, next) => {
    let query = `DELETE FROM usuario WHERE codigou = ${req.params.codigou};`;
    conn.query(query, (err) => {
      if (err) res.status(500).json({ status: 1, message: "Error" });
      else
        res.json({
          status: 0,
          message: "Usuario eliminado exitosamente",
        });
    });
  });
};
