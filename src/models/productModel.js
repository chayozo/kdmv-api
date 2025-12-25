const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String },
  price: { type: Number, require: true },
  qty: { type: Number, require: true },
  image: [{ type: mongoose.Types.ObjectId, ref: "product_images" }],
  createdDate: { default: Date.now, type: Date },
});

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
