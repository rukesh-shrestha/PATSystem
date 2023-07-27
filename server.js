const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/dbConnector");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const userRouter = require("./routes/userRoutes");
const passport = require("passport");
require("./config/googleAuth")(passport);
require("dotenv").config();
connectDB();
const corsOptions = {
  origin: process.env.DOMAIN_NAME,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // If you need to allow sending cookies or authentication headers
};
app.use(cors(corsOptions));
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

app.use(morgan("dev"));
app.listen(port, () => {
  console.log(`The server is hosted on http://localhost:${port} `);
});
