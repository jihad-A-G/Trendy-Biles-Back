import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true
  },
  password: {
    type: Number,
    required: true
  },
  email: { 
    type: Boolean ,
    required: true
  },
  phoneNumber : {
    type : Number,
    required: true
  },
  address: {
    type: String,
    required: true,
  }
});

// productSchema.pre("find", function (next) {
//   this.populate(["roles"]);
//   next();
// });

const Product = mongoose.model("users", userSchema);

module.exports = Product;
