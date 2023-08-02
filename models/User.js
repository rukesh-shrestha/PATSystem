const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    googleId: {
      type: String,
      // required: [true, "Missing Google ID. Google Authentication Required"],
    },
    username: {
      type: String,
      required: [true, "Missing username"],
    },
    email: {
      type: String,
      required: [true, "Missing Email"],
    },
    firstName: {
      type: String,
      required: [true, "Missing firstname"],
    },
    lastName: {
      type: String,
      required: [true, "Mising lastname"],
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "staff"],
      required: [true, "Missing Role"],
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
