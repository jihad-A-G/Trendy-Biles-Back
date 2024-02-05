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
    required: false,
    default:false
  },
  categoryImage:{
    type:String,
    required:true
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      required: false,
    },
  ],
});


categorySchema.statics.getAllCategories =  async function() 
{
  return this.find().populate("products");
};
categorySchema.statics.getOneCategory =  async function (categoryId) {
  return this.findById(categoryId)?.populate("products");
};
  
const Category = mongoose.model("categories", categorySchema); 

//Change stream
const categoryChangeStream = Category.watch()

//Event listener for any change

categoryChangeStream.on('change', async (change) => {
console.log(change);
  const operationType = change.operationType;
  const collectionName = change.ns.coll;
  // const document = change.fullDocument ? JSON.stringify(change.fullDocument) : null;
 
  // Create a new notification instance
  const notification = await  Notification.create({
     title: `${operationType} operation in ${collectionName}`,
     message: 'See the changes',
     readStatus: false, 
     table:collectionName,
     time:change.wallTime


  });
 

  io.emit('notification', notification);
 

 });

export default Category;
