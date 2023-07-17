const mongoose = require("mongoose");

const users = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Enter your email addess"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Enter your username"],
      unique: true,
    },
    firstname: {
      type: String,
      required: [true, "Enter your firstname"],
    },
    lastname: {
      type: String,
      required: [true, "Enter your lastname"],
    },
    password: {
      type: String,
      required: [true, "Enter your password"],
      minLength: 6,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", users);
