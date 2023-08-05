const validateUserStatus = (req, res, next) => {
  if (req.user.isVerified && req.user.status) {
    next();
  } else {
    res.status(401);
    throw new Error("Email not Verified - Unauthorized");
  }
};

module.exports = validateUserStatus;
