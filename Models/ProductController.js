import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String },
  price: { type: Number },
  image: { type: String },
  categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "categories" },
  newPrice: { type: Number },
  itsNew: { type: Boolean, default: false },
});

productSchema.pre("find", function (next) {
  // populate here to appear the
  this.populate(["categoryID"]);
  next();
});

const Product = mongoose.model("products", productSchema); // the products here is the name for table at data base

module.exports = Product;
