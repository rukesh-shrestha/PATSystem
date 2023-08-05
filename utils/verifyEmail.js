const userModel = require("../models/User");
const generateAccessToken = require("../utils/accessToken");

const verifyEmail = async (req, res) => {
  try {
    const emailToken = req.query.emailToken;
    if (!emailToken) {
      res.status(404);
      throw new Error("Token not found");
    }
    const user = await userModel.findOne({ emailToken });
    if (user) {
      user.emailToken = null;
      user.isVerified = true;
      await user.save();
      const token = generateAccessToken(user);
      res.status(200);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token,
        isVerified: user?.isVerified,
      });
    } else {
      res.status(498);
      throw new Error("Token validation Failed");
    }
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};
module.exports = verifyEmail;
