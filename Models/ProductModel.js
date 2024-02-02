// Product Model (product.model.js)
import mongoose from "mongoose";
import Notification from "./notificationModel.js";
import io from "../config/socketIo.js";
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

const productChangeStream = Product.watch()

//Event listener for any change

productChangeStream.on('change', async (change) => {
console.log(change);
  const operationType = change.operationType;
  const collectionName = change.ns.coll;
  // const document = change.fullDocument ? JSON.stringify(change.fullDocument) : null;
 
  // Create a new notification instance
  const notification = new Notification({
     title: `${operationType} operation in ${collectionName}`,
     message: 'See the changes', // Store the document as a string
     readStatus: false, // Default to unread
     // You can also set the receiver field here if applicable
  });
 

  io.to('superAdminRoom').emit('notification', notification);
 

  await notification.save();
 });

export default Product;
