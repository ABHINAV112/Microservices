const express = require("express");
const proxy = require("express-http-proxy");
require("dotenv").config();
console.log(process.env);

// SCHEMA validation
// Type of validation
// Database connector
// userID from auth token - name for the JSON request

const config = require("./config/services.json");

const app = express();

for (let i = 0; i < config.length; i++) {
  app.use(config[i].endpoint, proxy(config[i].url));
}

app.listen(process.env.PORT);
