import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true,
  },
  message:{
    type:String,
    required:true
  },
  readStatus:{
    type:Boolean,
    default:false,
  },

});


const Notification = mongoose.model("notifications", notificationSchema); // the notifications here is the name for table at data base

export default Notification
