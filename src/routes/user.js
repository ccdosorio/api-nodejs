const conn = require("../config/database");
const jwt = require("jsonwebtoken");
const Service = require("../service");

module.exports = (app) => {
  app.get("/usuarios", Service.verify, (req, res) => {
    let query = "SELECT * FROM usuario;";
    conn.query(query, (err, rows) => {
      if (err) res.status(500).json({ status: 1, message: "Error", data: [] });
      else res.json({ status: 0, message: "Ok", data: rows });
    });
  });

  app.get("/usuarios/:codigou", Service.verify, (req, res) => {
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

  /**
   * Endpoint para registrar un usuario
   */

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

  /**
   * Endpoint para editar un usuario (Mi cuenta)
   */
  app.put("/usuarios/:codigou", Service.verify, (req, res) => {
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

  app.delete("/usuarios/:codigou", Service.verify, (req, res, next) => {
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

  /**
   * Endpoint para realizar login en la aplicación
   */
  app.post("/login", (req, res) => {
    let body = {
      email: req.body.email,
      password: req.body.password,
    };
    let query = `SELECT codigou, carnet, nombre, apellido, user, email, password 
                FROM usuario WHERE email = ? AND password = ? ;`;
    conn.query(query, [body.email, body.password], (err, rows) => {
      if (err) res.status(500).json({ status: 1, message: "Error" });
      else {
        if (rows.length > 0) {
          if (
            rows[0].password === body.password &&
            rows[0].email === body.email
          ) {
            let temp = {
              codigou: rows[0].codigou,
              nombre: rows[0].nombre,
              apellido: rows[0].apellido,
              carnet: rows[0].carnet,
              user: rows[0].user,
              email: rows[0].email,
            };

            let token = jwt.sign(temp, "ingenieriadesoftware2021", {
              expiresIn: "1h",
            });

            let user = {
              codigou: rows[0].codigou,
              nombre: rows[0].nombre,
              apellido: rows[0].apellido,
              carnet: rows[0].carnet,
              user: rows[0].user,
              email: rows[0].email,
              token: token,
            };
            res.json({
              status: 0,
              message: "Inicio de sesión",
              data: user,
            });
          }
        } else {
          res.json({ status: 1, message: "Los datos no coiciden" });
        }
      }
    });
  });
};
