const userHome = (req, res) => {
  const useremail = req.user.email;
  console.log(req);
  res.status(200).json({
    user: req.user,
    accesstoken: req.session,
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

// Users for the super admin and admin

const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUpUser = async (req, res) => {
  try {
    const reg = /[a-zA-Z\.]+[0-9a-zA-Z\.]*@heraldcollege.edu.np$/y;

    const regPAT = /^(pat|PAT)[a-zA-Z0-9\.]*@heraldcollege.edu.np$/y;
    console.log(req.body);
    const { username, email, firstName, lastName, password, confirmPassword } =
      req.body;

    console.log(!reg.test(email));

    if (
      !username ||
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword
    ) {
      res.status(400);
      throw new Error("Missing Field");
    }
    if (password !== confirmPassword) {
      res.status(403);
      throw new Error("Password validation Failed");
    }

    const userAvailable = await User.findOne({ email });
    const hashedPassword = await bcrypt.hash(password, 10);

    if (reg.test(email)) {
      console.log(reg.test(email));
      res.status(403);
      throw new Error("Email Validation Failed. Use the organization Email");
    } else if (userAvailable) {
      res.status(401);
      throw new Error("User Already Exist");
    } else if (regPAT.test(email)) {
      const user = await User.create({
        username,
        email,
        firstName,
        lastName,
        password: hashedPassword,
        role: "admin",
      });

      res.status(200).json({
        data: {
          _id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        message: "User Created Successfully",
      });
    } else if (reg.test(email)) {
      const user = await User.create({
        username,
        email,
        firstName,
        lastName,
        password: hashedPassword,
        role: "superadmin",
      });

      res.status(200).json({
        data: {
          _id: user.id,
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        },
        message: "User Created Successfully",
      });
    } else {
      res.status(401);
      res.json({
        error:
          "Email validation failed. You can use only use one special character. (.)",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

const signInUser = async (req, res) => {
  try {
    let comparePassword;
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Missing Field");
    } else {
      const userAvailable = await User.findOne({ email });
      userAvailable
        ? (comparePassword = await bcrypt.compare(
            password,
            userAvailable.password
          ))
        : res.status(404);

      if (!userAvailable) {
        res.status(404);
        throw new Error("User Not Found");
      } else if (!comparePassword) {
        res.status(401);
        throw new Error("Validation Failed");
      } else {
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
            },
          },
          process.env.SESSION_SECRET_KEY,
          { expiresIn: "30m" }
        );
        res.status(200);
        res.json({ token: accesstoken });
      }
    }
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

module.exports = {
  userHome,
  userRegister,
  userLogoutController,
  signUpUser,
  signInUser,
};
