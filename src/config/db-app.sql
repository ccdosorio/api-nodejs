USE dbflutter;

-- --------------------------------------------------------------
--                     TABLA TIPO 
-- --------------------------------------------------------------
CREATE TABLE tipo (
	codigot INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(100) NOT NULL,
	PRIMARY KEY (codigot)
);

SELECT * FROM tipo;

-- --------------------------------------------------------------
--                     TABLA CARRERA 
-- --------------------------------------------------------------

CREATE TABLE carrera (
	idc INT NOT NULL AUTO_INCREMENT,
	carrera VARCHAR(256) NOT NULL,
	PRIMARY KEY (idc)
);

SELECT * FROM carrera;

-- --------------------------------------------------------------
--                     TABLA CURSO 
-- --------------------------------------------------------------

CREATE TABLE curso (
	codigoc INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(256) NOT NULL,
	PRIMARY KEY(codigoc)
);

SELECT * FROM curso;

-- --------------------------------------------------------------
--                     TABLA USUARIO 
-- --------------------------------------------------------------

CREATE TABLE usuario (
	codigou INT NOT NULL AUTO_INCREMENT,
	carnet INT NOT NULL,
	nombre VARCHAR(256) NOT NULL,
	apellido VARCHAR(256) NOT NULL,
	USER VARCHAR(30) NOT NULL,
	idc INT NOT NULL,
	codigot INT NOT NULL, 
	PASSWORD VARCHAR(256) NOT NULL,
	email VARCHAR(256) NOT NULL,
	PRIMARY KEY (codigou),
	FOREIGN KEY (idc) REFERENCES carrera(idc),
	FOREIGN KEY (codigot) REFERENCES tipo(codigot)
);

SELECT * FROM usuario;

-- --------------------------------------------------------------
--                     TABLA ASIGNACIÓN 
-- --------------------------------------------------------------

CREATE TABLE asignacion (
	codigoa INT NOT NULL AUTO_INCREMENT,
	codigou INT NOT NULL,
	codigoc INT NOT NULL,
	PRIMARY KEY (codigoa),
	FOREIGN KEY (codigou) REFERENCES usuario(codigou),
	FOREIGN KEY (codigoc) REFERENCES curso(codigoc)
);

SELECT * FROM asignacion;

-- Obtener asignaciones segun el alumno

SELECT a.codigoa, a.codigou, a.codigoc, CONCAT(u.nombre,' ',u.apellido) AS alumno, 
u.carnet, c.codigoc, c.nombre AS curso
FROM asignacion a
INNER JOIN usuario u ON(a.codigou = u.codigou)
INNER JOIN curso c ON(a.codigoc = c.codigoc)
WHERE a.codigou = 1;

-- --------------------------------------------------------------
--                     TABLA Actividades 
-- --------------------------------------------------------------

CREATE TABLE actividades (
  idactividad int(11) NOT NULL AUTO_INCREMENT,
  titulo varchar(15) NOT NULL,
  descripcion varchar(15) NOT NULL,
  fecha_asignacion date NOT NULL,
  fecha_entrega date NOT NULL,
  path_pdf TEXT,
  idCursoAsignacion int(11) NOT NULL,
  idTipoAsignacion int(11) NOT NULL,
 PRIMARY KEY (idtarea),
 FOREIGN KEY (idCursoAsignacion) REFERENCES asignacion(codigoa),
 FOREIGN KEY (idTipoAsignacion) REFERENCES actividades_tipo(idtipo)
 );
 
 SELECT * FROM actividades;

-- --------------------------------------------------------------
--                     TABLA Actividades Tipo 
-- --------------------------------------------------------------

CREATE TABLE actividades_tipo (
  idtipo int(11) NOT NULL AUTO_INCREMENT,
  asignacion varchar(15) NOT NULL,
 PRIMARY KEY (idtarea)
 );
 
 SELECT * FROM actividades_tipo;
 
SELECT a.idactividad, a.titulo, a.descripcion, a.punteo, a.fecha_asignacion, a.fecha_entrega, a.path_pdf,
a.idCursoAsignacion, b.asignacion, c.nombre curso
FROM actividades a
INNER JOIN actividades_tipo b ON(a.idTipoAsignacion = b.idtipo)
INNER JOIN asignacion asi ON (a.idCursoAsignacion = asi.codigoa)
INNER JOIN curso c ON(asi.codigoc = c.codigoc)
WHERE a.idCursoAsignacion = 1;


