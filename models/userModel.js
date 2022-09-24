const { Schema, model } = require("../db/connections"); // import Schema & model

// User Schema
const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  dateRegister: { type: Date, required: true },
  dateLastAuthorization: { type: Date },
  status: { type: String, default: "Offline" },
  password: { type: String, required: true },
});

// User model
const User = model("User", UserSchema);

module.exports = User;
