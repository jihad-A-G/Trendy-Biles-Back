import mongoose from "mongoose";
import Notification from "./notificationModel.js";
import io from "../config/socketIo.js";
const categorySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
  },
  confirm: { 
    type: Boolean,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: false,
    },
  ],
});

// categorySchema.pre("find", function (next) {
//   this.populate(["products"]);
//   next();
// });

categorySchema.statics.getAllCategories =  async function() 
{
  return this.find().populate("products");
};
categorySchema.statics.getOneCategory =  async function (categoryId) {
  return this.findById(categoryId)?.populate("products");
};
  
const Category = mongoose.model("categories", categorySchema); // the products here is the name for table at data base

//Change stream
const categoryChangeStream = Category.watch()

//Event listener for any change

categoryChangeStream.on('change', async (change) => {
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

export default Category;
