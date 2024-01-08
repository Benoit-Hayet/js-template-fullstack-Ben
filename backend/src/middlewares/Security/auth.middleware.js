const jwt = require("jsonwebtoken");
const models = require("../../models");

const authMiddleware = (req, res, next) => {
  // Step 1: denied access without token
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "La racaille, ça dégage" });
  }

  // Step 2: verify token then set user data in req
  return jwt.verify(
    req.headers.authorization.split(" ")[1],
    process.env.APP_SECRET,
    (err, data) => {
      if (err) {
        return res.status(401).json({ error: err.message });
      }
      // Step 3: get user data from token payload
      models.user.getProfile(data.id).then(([rows]) => {
        if (!rows.length) {
          return res.status(401).json({ error: "T'es mort poto" });
        }
        // Step 4: share user data between different middlewares
        // eslint-disable-next-line prefer-destructuring
        req.user = rows[0];
        return next();
      });
      return null;
    }
  );
};

module.exports = { authMiddleware };
