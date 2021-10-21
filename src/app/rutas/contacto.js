const conn = require("../../config/database");

module.exports = (app) => {
  app.get("/cursos", (req, res) => {
    let query = "SELECT * FROM cursos;";
    conn.query(query, (err, rows) => {
      if (err) res.status(500).json({ status: 1, msg: "Error" });
      else res.json({ status: "0", message: "OK", data: rows });
    });
  });

  app.get("/carreras", (req, res) => {
    let query = "SELECT * FROM carreras;";
    conn.query(query, (err, rows) => {
      if (err) res.status(500).json({ status: 1, msg: "Error" });
      else res.json({ status: "0", message: "OK", data: rows });
    });
  });

  app.get("/contacto/email/:email", (req, res) => {
    let query = `SELECT * FROM contacto WHERE email = '${req.params.email}';`;
    conn.query(query, (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).json({ status: 0, msg: "Error" });
      } else {
        if (rows.length > 0) {
          res.json({ status: 1, msg: "Exitoso", data: rows });
        } else {
          res.status(404).json({ status: 0, msg: "Contacto no encontrado" });
        }
      }
    });
  });

  app.get("/contacto/id/:id", (req, res) => {
    let query = `SELECT * FROM contacto WHERE id = ${req.params.id};`;
    conn.query(query, (err, rows) => {
      if (err) {
        console.log(err);
        res.status(500).json({ status: 0, msg: "Error" });
      } else {
        if (rows.length > 0) {
          res.json({ status: 1, msg: "Exitoso", data: rows });
        } else {
          res.status(404).json({ status: 0, msg: "Contacto no encontrado" });
        }
      }
    });
  });

  app.post("/contacto", (req, res) => {
    let contacto = {
      nombre: req.body.nombre,
      nacimiento: new Date(req.body.nacimiento),
      telefono: req.body.telefono,
      email: req.body.email,
    };
    let query = `INSERT INTO contacto(nombre, fecha_nac, telefono, email) VALUES (?,?,?,?)`;
    conn.query(
      query,
      [contacto.nombre, contacto.nacimiento, contacto.telefono, contacto.email],
      (err) => {
        if (err) res.status(500).json({ status: 0, msg: "Error de servidor" });
        else res.json({ status: 1, msg: "Contacto insertado correctamente" });
      }
    );
  });

  app.put("/contacto/:id", (req, res) => {
    let contacto = {
      id: req.params.id,
      nombre: req.body.nombre,
      nacimiento: new Date(req.body.nacimiento),
      telefono: req.body.telefono,
      email: req.body.email,
    };
    let query = `UPDATE contacto SET nombre = ?, fecha_nac = ?, telefono = ?, email = ? WHERE id = ?;`;
    conn.query(
      query,
      [
        contacto.nombre,
        contacto.nacimiento,
        contacto.telefono,
        contacto.email,
        contacto.id,
      ],
      (err) => {
        if (err) res.status(500).json({ status: 0, msg: "Error de servidor" });
        else res.json({ status: 1, msg: "Contacto editado correctamente" });
      }
    );
  });

  app.delete("/contacto/:id", (req, res, next) => {
    let query = `DELETE FROM contacto WHERE id = ${req.params.id};`;
    conn.query(query, (err, rows) => {
      if (err) res.status(500).json({ status: 0, msg: "Error" });
      else res.json({ status: 1, msg: "Exitoso" });
    });
  });
};
