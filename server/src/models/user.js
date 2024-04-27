const { Schema, model: Model } = require("mongoose");
const bcrypt = require("bcrypt");

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

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8, null));
};

userSchema.methods.validatePassword = function(password_hashed){
  return bcrypt.compareSync(password_hashed, this.Password);
}

const User = new Model("User", userSchema);

module.exports = User;
