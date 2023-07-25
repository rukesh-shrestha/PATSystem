const express = require("express");
const app = express();
const connectDB = require("./config/dbConnector");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const userRouter = require("./routes/userRoutes");
const passport = require("passport");
require("./config/googleAuth")(passport);
require("dotenv").config();
connectDB();

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.CONNECTION_MONGO_STRING,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());
const port = process.env.PORT;
app.use("/api/users", userRouter);
app.listen(port, () => {
  console.log(`The server is hosted on http://localhost:${port} `);
});
