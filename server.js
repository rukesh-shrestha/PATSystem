const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/dbConnector");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const userRouter = require("./routes/userRoutes");
const dashRouter = require("./routes/dashboardRoutes");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const passport = require("passport");
require("./config/googleAuth")(passport);
require("dotenv").config();
connectDB();
const swaggerDocument = YAML.load("./swagger/swaggerAPIDoc.yaml");

const corsOptions = {
  origin: process.env.DOMAIN_NAME,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // If you need to allow sending cookies or authentication headers
};
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());
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
app.use("/api", dashRouter);

app.use(morgan("dev"));
app.listen(port, () => {
  console.log(`The server is hosted on http://localhost:${port} `);
});
