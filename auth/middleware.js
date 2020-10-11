module.exports = {
  authenticate: async (req, res, next) => {
    try {
      const { User } = require("./database");
      const JWT_SECRET = process.env.JWT_SECRET;
      const jwt = require("jsonwebtoken");
      console.log(req.headers);
      const jwtToken = req.headers["authorization"];
      console.log(jwtToken);
      const identifier = jwt.verify(jwtToken, JWT_SECRET).data.identifier;
      const user = await User.findOne({ where: { identifier } });
      if (user == null) {
        const err = new Error("Not authorized! Go back!");
        err.status = 400;
        return next(err);
      }
      return next();
    } catch (err) {
      return next(err);
    }
  },
};
