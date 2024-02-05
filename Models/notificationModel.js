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
  table:{
    type:String,
    required:true
  },
  time:{
    type:Date,
    required:true
  }

});


const Notification = mongoose.model("notifications", notificationSchema); // the notifications here is the name for table at data base

export default Notification
