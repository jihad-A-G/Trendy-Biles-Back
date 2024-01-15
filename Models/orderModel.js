import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  orderNumber: { 
    type: Number,
  },
  userId:{
    type: Number,
    required: true,
  },
  products:[
    {
        quantity: {
            type: Number
        }
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  date:{
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  }
});


const Order = mongoose.model("orders", orderSchema); // the Orders here is the name for table at data base

export default Order
