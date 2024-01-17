import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const validStatusValues = ["pending", "on delivery", "received"];

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: Number,
    sequence: { type: String, inc_field: "orderNumber" },
    required: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  products: [
    {
      quantity: {
        type: Number
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
      },
    }
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    required: false,
    enum: validStatusValues,
    default: "pending"
  }
});

orderSchema.plugin(mongooseSequence(mongoose), { inc_field: "orderNumber" });

orderSchema.pre("find", function (next) {
  this.populate("userId").populate("products.product");
  next();
});

const Order = mongoose.model("orders", orderSchema);

export default Order;
