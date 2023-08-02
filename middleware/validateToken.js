const jwt = require("jsonwebtoken");

const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("User is not Authorized -  Invalid Token");
        }
        req.user = decoded.user;
        next();
      });

      if (!token) {
        res.status(401);
        throw new Error("user is not Authorized or the token is missing");
      }
    } else {
      res.status(400);
      throw new Error("Missing  Authorized Token");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

module.exports = validateToken;
