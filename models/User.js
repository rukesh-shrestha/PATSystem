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
      unique: false,
    },
    email: {
      type: String,
      required: [true, "Missing Email"],
      unique: true,
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
    status: {
      type: Boolean,
      enum: [true, false],
      default: true,
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
