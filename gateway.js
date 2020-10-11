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

// for (let i = 0; i < config.length; i++) {
//   app.use(config[i].endpoint, proxy(config[i].url));
// }
app.use(authenticate);
app.get("/test", (req, res) => {
  return res.send("authorized");
});

app.listen(process.env.PORT || 8000);
