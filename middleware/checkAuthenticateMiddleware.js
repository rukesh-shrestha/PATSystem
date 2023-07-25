const authenticateUser = (req, res, next) => {
  req.user
    ? next()
    : res.status(401).json({
        message: "Unauthorized",
      });
};

// const isLoggedIn = (req, res, next) => {
//   req.user ? res.redirect("/api/users") : next();
// };

module.exports = authenticateUser;
