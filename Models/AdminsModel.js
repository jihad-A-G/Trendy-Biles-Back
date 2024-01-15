import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true
  },
  password: {
    type: Number,
    required: true
  },
  authorized: { 
    type: Boolean ,
    required: true
  },
  roles: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "roles",
    required: true
  }
});

productSchema.pre("find", function (next) {
  this.populate(["roles"]);
  next();
});

const Product = mongoose.model("admins", adminSchema);

module.exports = Product;