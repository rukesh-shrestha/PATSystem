const express = require("express");
const app = express();
const connectDB = require("./config/dbConnector");
const userRouter = require("./routes/userRoutes");
require("dotenv").config();
connectDB();
const port = process.env.PORT;
app.use("/api/v0.1/users", userRouter);
app.listen(port, () => {
  console.log(`The server is hosted on http://localhost:${port} `);
});
