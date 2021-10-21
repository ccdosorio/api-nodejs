const express = require("express");

const app = express();
app.use(express.json());
app.set("port", process.env.PORT || 4000);

module.exports = app;
