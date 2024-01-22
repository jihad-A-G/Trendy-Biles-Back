// Product Model (product.model.js)
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
      required: true,
    },
  details: [
      {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productDetails",
    required: true, 
    },
    ],   
  categories: [
    {
    type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
      required: true,
    },
  ],
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "brands",
    required: false,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Accepted", "Rejected", "Pending", "New"],
    default: "Accepted",
    required: true,
  },

});

productSchema.statics.getAllProducts = async function () {
    return this.find().populate("categories").populate("brand").populate("details");
};

productSchema.statics.getProductById = async function (productId) {
    return this.findById(productId).populate("categories").populate("brand").populate("details");
};

const Product = mongoose.model("products", productSchema);

export default Product;
