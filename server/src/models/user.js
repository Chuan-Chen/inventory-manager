const { Schema, model: Model } = require("mongoose");
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


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
    Salt: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    FirstName: {
      type: String,
      required: true,
    },
    LastName: {
      type: String,
      required: true,
    },
    ProfilePicture: {
      type: String
    },
    Items: [

    ],
    Categories: [

    ],
    TotalItemsCreated: {
      type: Number,
      required: true
    },
    UserID: {
      type: Number
    }
  },
  // to include createdAt and updatedAt fields automatically
  { timestamps: true }
);

userSchema.plugin(AutoIncrement, {id: "Users", inc_field: 'UserID'});
const User = new Model("User", userSchema);

module.exports = {User, userSchema};
