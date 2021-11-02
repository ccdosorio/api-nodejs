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
    let query = `SELECT a.idactividad, a.titulo, a.descripcion, a.punteo, a.fecha_asignacion, a.fecha_entrega, a.path_pdf,
                a.idCursoAsignacion, b.asignacion, c.nombre curso
                FROM actividades a
                INNER JOIN actividades_tipo b ON(a.idTipoAsignacion = b.idtipo)
                INNER JOIN asignacion asi ON (a.idCursoAsignacion = asi.codigoa)
                INNER JOIN curso c ON(asi.codigoc = c.codigoc)
                WHERE a.idCursoAsignacion = ${req.params.idCursoAsignacion};`;
    conn.query(query, (err, rows) => {
      if (err) {
        res.status(500).json({ status: 1, message: "Error", data: [] });
      } else {
        if (rows.length > 0) {
          let assingment = null;
          let activity_response = {};
          rows.map((item) => {
            if (assingment === item.asignacion) {
              let newItem = {
                title: item.titulo,
                description: item.descripcion,
                points: item.punteo,
                date: item.fecha_asignacion,
                deadline: item.fecha_entrega,
                path: item.path_pdf,
              };
              activity_response[assingment].push(newItem);
            } else {
              let newItem = {
                title: item.titulo,
                description: item.descripcion,
                points: item.punteo,
                date: item.fecha_asignacion,
                deadline: item.fecha_entrega,
                path: item.path_pdf,
              };
              activity_response[item.asignacion] = [];
              activity_response[item.asignacion].push(newItem);
              assingment = item.asignacion;
            }
          });

          let response = {
            course: rows[0].curso,
            modules: [],
          };

          let asignacion = null;
          for (let i = 0; i < rows.length; i++) {
            if (asignacion === rows[i].asignacion) {
              let newItem = {
                title: rows[i].titulo,
                description: rows[i].descripcion,
                points: rows[i].punteo,
                date: rows[i].fecha_asignacion,
                deadline: rows[i].fecha_entrega,
                path: rows[i].path_pdf,
              };
              for (let j = 0; j < response.modules.length; j++) {
                if (response.modules[j].module === rows[i].asignacion) {
                  response.modules[j].tasks.push(newItem);
                }
              }
            } else {
              let jsonTemp = {
                module: rows[i].asignacion,
                tasks: [],
              };
              let newItem = {
                title: rows[i].titulo,
                description: rows[i].descripcion,
                points: rows[i].punteo,
                date: rows[i].fecha_asignacion,
                deadline: rows[i].fecha_entrega,
                path: rows[i].path_pdf,
              };
              jsonTemp.tasks.push(newItem);
              response.modules.push(jsonTemp);
              asignacion = rows[i].asignacion;
            }
          }

          res.json({ status: 0, message: "Ok", data: response });
        } else {
          res.status(404).json({
            status: 1,
            message: "No hay actividades asignadas para este curso",
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

    conn.query(
      query,
      [
        body.titulo,
        body.descripcion,
        body.fecha_asignacion,
        body.fecha_entrega,
        body.idCursoAsignacion,
        body.idTipoAsignacion,
      ],
      (err, rows) => {
        if (err) res.status(500).json({ status: 1, message: "Error" });
        else
          res.json({
            status: 0,
            message: "Actividad creada exitosamente",
          });
      }
    );
  });
};
