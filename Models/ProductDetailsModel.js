import mongoose from "mongoose";

const productDetailsSchema = new mongoose.Schema({
  specificName: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  deal: {
    type: Boolean,
    default: false,
    required: true,
  },
  dealPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  storage: {
    type: Number,
    required: false,
  },
  ram: {
    type: Number,
    required: false,
  },
  sim: {
    type: Number,
    required: false,
  },
  color: {
    type: String,
    required: false,
  },
});

const ProductDetails = mongoose.model("productDetails", productDetailsSchema);

export default ProductDetails;
