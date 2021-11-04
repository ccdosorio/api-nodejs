const app = require("./src/config/server");

/**
 * Routes
 */
require("./src/routes/course")(app);
require("./src/routes/career")(app);
require("./src/routes/user")(app);
require("./src/routes/assignment")(app);
require("./src/routes/type")(app);
require("./src/routes/activities")(app);
require("./src/routes/schedules")(app);


/**
 * CORS
 */

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

/**
 * PORT
 */
app.listen(app.get("port"), () => {
  console.log(`Server run in port ${app.get("port")}`);
});
