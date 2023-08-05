const jwt = require("jsonwebtoken");

const generateAccessToken = (userAvailable) => {
  const accesstoken = jwt.sign(
    {
      user: {
        id: userAvailable.id,
        username: userAvailable.username,
        email: userAvailable.email,
        firstName: userAvailable.firstName,
        lastName: userAvailable.lastName,
        role: userAvailable.role,
        status: userAvailable.status,
        image: userAvailable.image,
      },
    },
    process.env.SESSION_SECRET_KEY,
    { expiresIn: "30m" }
  );

  return accesstoken;
};

module.exports = generateAccessToken;
