const userHome = (req, res) => {
  const useremail = req.user.email;
  res.status(200).json({
    user: useremail,
  });
};

const userRegister = (req, res) => {
  res.status(200).json({
    linkhref: "<a href=/api/v0.1/users/auth/google>Google</a>",
  });
};

const userLogoutController = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    req.session.destroy();
    res.status(200).json({ message: "I feel bad you are going" });
  });
};

module.exports = { userHome, userRegister, userLogoutController };
