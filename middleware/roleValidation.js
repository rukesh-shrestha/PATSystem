const adminPermission = (req, res, next) => {
  try {
    if (req.user.isVerified) {
      if (req.user.role === "admin" || req.user.role === "superadmin") {
        next();
      } else {
        res.status(403);
        throw new Error("You don't have permission.");
      }
    } else {
      res.status(401);
      throw new Error("Unauthorized - Email is not Verify");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const superAdminPermission = (req, res, next) => {
  try {
    if (req.user.isVerified) {
      if (req.user.role === "superadmin") {
        next();
      } else {
        res.status(403);
        throw new Error("You don't have permission.");
      }
    } else {
      res.status(401);
      throw new Error("Unauthorized - Email is not Verify");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const staffPermission = (req, res, next) => {
  try {
    if (req.user.isVerified) {
      if (
        req.user.role === "staff" ||
        req.user.role === "admin" ||
        req.user.role === "superadmin"
      ) {
        next();
      } else {
        res.status(403);
        throw new Error("You don't have permission.");
      }
    } else {
      res.status(401);
      throw new Error("Unauthorized - Email is not Verify");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};
module.exports = { adminPermission, superAdminPermission, staffPermission };
