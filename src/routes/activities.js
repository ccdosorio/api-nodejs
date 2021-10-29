const conn = require("../config/database");
const Service = require("../service");

module.exports = (app) => {
  app.get("/actividades", Service.verify, (req, res) => {
    let query = `select a.idactividad, a.titulo, a.descripcion, a.punteo, a.fecha_asignacion, a.fecha_entrega, a.path_pdf,
                    a.idCursoAsignacion, b.asignacion
                from actividades a, actividades_tipo b
                where a.idTipoAsignacion = b.idtipo;`;
    conn.query(query, (err, rows) => {
      if (err) res.status(500).json({ status: 1, message: "Error", data: [] });
      else res.json({ status: 0, message: "Ok", data: rows });
    });
  });

  app.get("/actividades/:idCursoAsignacion", Service.verify, (req, res) => {
    let query = `select a.idactividad, a.titulo, a.descripcion, a.punteo, a.fecha_asignacion, a.fecha_entrega, a.path_pdf,
                    a.idCursoAsignacion, b.asignacion
                from actividades a, actividades_tipo b
                where a.idTipoAsignacion = b.idtipo
                and a.idCursoAsignacion = ${req.params.idCursoAsignacion};`;
    conn.query(query, (err, rows) => {
      if (err) {
        res.status(500).json({ status: 1, message: "Error", data: [] });
      } else {
        if (rows.length > 0) {
          res.json({ status: 0, message: "Ok", data: rows });
        } else {
          res.status(404).json({
            status: 1,
            message: "El alumno no tiene tareas asignadas",
            data: [],
          });
        }
      }
    });
  });

  app.post("/actividades", Service.verify, (req, res) => {
    let body = {
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        fecha_asignacion: req.body.fecha_asignacion,
        fecha_entrega: req.body.fecha_entrega,
        idCursoAsignacion: req.body.idCursoAsignacion,
        idTipoAsignacion: req.body.idTipoAsignacion,
    };
    let query = `insert into actividades (titulo, descripcion, fecha_asignacion, fecha_entrega, idCursoAsignacion, idTipoAsignacion) values (?,?,?,?,?,?);`;
    
    conn.query(query, [body.titulo, body.descripcion, body.fecha_asignacion, body.fecha_entrega, body.idCursoAsignacion, body.idTipoAsignacion], (err, rows) => {
      if (err) res.status(500).json({ status: 1, message: "Error" });
      else
        res.json({
          status: 0,
          message: "Actividad creada exitosamente",
        });
    });
  });
};
