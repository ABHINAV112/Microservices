require("dotenv").config();
const { sequelize, User } = require("./database");
const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const router = express.Router();
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 15;
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

// Testing if sequelize connects succesfully
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection to db has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

router.use(bodyParser.json());

router.post("/login", async (req, res) => {
  // Body
  // identifier
  // password
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({ where: { identifier } });
    console.log(user);
    if (user == null) {
      return res.status(400).send("User identifier not found");
    }
    const comparisonResult = await bcrypt.compare(password, user.hash);
    if (!comparisonResult) {
      return res.status(400).send("User password is wrong");
    }
    const jwtToken = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: { identifier },
      },
      JWT_SECRET
    );

    return res.send(jwtToken);
    // TODO: finish generating a JWT token
  } catch (err) {
    return res.status(500).send("ERROR");
  }
});

router.post("/register", async (req, res) => {
  // BODY:
  // identifier
  // password

  try {
    const { identifier, password } = req.body;
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const [user, created] = await User.findOrCreate({
      where: { identifier },
      defaults: {
        hash,
      },
    });
    if (created) {
      return res.status(200).send("User successfully created");
    } else {
      return res.status(400).send("User already exists");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("ERROR");
  }
});

module.exports = router;
