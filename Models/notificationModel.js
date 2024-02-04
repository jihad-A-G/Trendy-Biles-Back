import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  content: { 
    type: String,
    required: true,
  },
  sender_id: { 
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  reciever_id: { 
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
});


const Notification = mongoose.model("notifications", notificationSchema); // the notifications here is the name for table at data base

export default Notification
