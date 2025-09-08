const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  image: { type: String },
  byProduct: { type: mongoose.Types.ObjectId, ref: "products" },
  createdDate: {type: Date, default: Date.now}
});

const productImageModel = new mongoose.model('product_image', imageSchema)
module.exports = productImageModel;