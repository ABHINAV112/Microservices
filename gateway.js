const express = require("express");
const proxy = require("express-http-proxy");
require("dotenv").config();
console.log(process.env);

// SCHEMA validation
// Type of auth
// Database connector
// userID from auth token - name for the JSON request

// handle auth details from the config file

// OVERALL GOAL:
// Don't have to edit the current code at all just have to edit config files

const config = require("./config/services.json");

const app = express();

for (let i = 0; i < config.length; i++) {
  app.use(config[i].endpoint, proxy(config[i].url));
}

app.listen(process.env.PORT);
