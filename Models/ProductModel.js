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

  productSchema.statics.getAllProducts = async function (status) {
    let query = this.find().populate("categories").populate("brand").populate("details");
    if (status) {
        query = query.where('status').equals(status);
    }
    return query;
  };

  productSchema.statics.getProductById = async function (productId, status) {
    let query = this.findById(productId).populate("categories").populate("brand").populate("details");
    if (status) {
        query = query.where('status').equals(status);
    }
    return query;
  };


  const Product = mongoose.model("products", productSchema);

  export default Product;
