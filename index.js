const app = require("./src/config/server");

// Rutas
require("./src/app/rutas/contacto")(app);

app.listen(app.get("port"), () => {
  console.log(`Server run in port ${app.get("port")}`);
});
