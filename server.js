const express = require("express");
const app = express();
const connectDB = require("./config/dbConnector");
const session = require("express-session");
require("./googleAuth/googleAuth");
const userRouter = require("./routes/userRoutes");
const passport = require("passport");
require("dotenv").config();
connectDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    // resave: false,
    // saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
const port = process.env.PORT;
app.use("/api/users", userRouter);
app.listen(port, () => {
  console.log(`The server is hosted on http://localhost:${port} `);
});
