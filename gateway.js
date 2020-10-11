const express = require("express");
const proxy = require("express-http-proxy");
const authRouter = require("./auth");
const { authenticate } = require("./auth/middleware.js");
require("dotenv").config();

// OVERALL GOAL:
// Don't have to edit the current code at all just have to edit config files

const config = require("./config/services.json");

const app = express();
app.use("/auth", authRouter);

for (let i = 0; i < config.length; i++) {
  const currentRouter = express.Router();
  if (config[i].requiresAuthentication) {
    currentRouter.use(authenticate);
  }
  currentRouter.use("/", proxy(config[i].url));
  app.use(config[i].endpoint, currentRouter);
}

app.listen(process.env.PORT || 8000);
