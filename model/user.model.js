const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    gender: { type: String, require: true },
    password: { type: String, require: true },
    city: { type: String, require: true },
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("user", userSchema);

const blackListSchema = mongoose.Schema(
  {
    token: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

const blackListModel = mongoose.model("black-list", blackListSchema);

module.exports = {
  userModel,
  blackListModel,
};
