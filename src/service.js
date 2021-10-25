var jwt = require("jsonwebtoken");
var services = {};

services.verify = function (req, res, next) {
  var token = services.getToken(req, res);
  jwt.verify(token, "ingenieriadesoftware2021", function (err, decoded) {
    if (err) {
      res.json({ status: 1, message: "Error en el token" });
    } else {
      req.token = token;
      req.usuario = decoded;
      next();
    }
  });
};
services.getToken = function (req, res) {
  var header = req.headers.authorization;
  if (typeof header != "undefined") {
    var headerArray = header.split(" ");
    var token = headerArray.pop();

    if (token) {
      return token;
    } else {
      res.json({ status: 1, message: "No existe el token" });
    }
  } else {
    res.json({ status: 1, message: "No Existe la cabecera Authorization" });
    return;
  }
};

module.exports = services;
