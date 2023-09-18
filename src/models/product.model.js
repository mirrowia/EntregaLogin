const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productCollection = "products";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  image_url: { type: String, required: true },
});
productSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productCollection, productSchema);

module.exports = { productModel };
