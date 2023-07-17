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

module.exports = { userHome, userRegister };
