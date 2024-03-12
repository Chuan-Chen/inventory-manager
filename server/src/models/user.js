const { Schema, model: Model } = require("mongoose");

const userSchema = new Schema(
  {
    Username: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
  },
  // to include createdAt and updatedAt fields automatically
  { timestamps: true }
);

const User = new Model("User", userSchema);

module.exports = User;
