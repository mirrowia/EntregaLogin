const mongoose = require("mongoose");

const userCollection = "users";

const userSchema = new mongoose.Schema({
  username: { type: String, require: true },
  name: { type: String, require: true },
  lastname: { type: String, require: true },
  age: { type: Number, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
  rol: { type: String, default: "user" },
});

const userModel = mongoose.model(userCollection, userSchema);

module.exports = { userModel };
