const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, reqiure: true },
  email: { type: String, reqiure: true },
  age: { type: Number, reqiure: true },
  gender: { type: String, require: true },
  role: { type: String, enum: ["admin", "editor", "user"], default: "user" },
  password: { type: String, reqiure: true },
  createdDate: { type: Date, default: Date.now },
  product: [{ type: mongoose.Types.ObjectId, ref: "products" }],
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
