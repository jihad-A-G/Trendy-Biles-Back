import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { 
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  cost: { 
    type: Number ,
    required: true
  },
  categories: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "categories",
    required: true
  },
  image: { 
    type: String,
    required: true
  },
  description: { 
    type: String ,
    required: true
  },
  deal: { 
    type: Boolean, 
    default: false,
    required: true
  },
  dealPrice: { 
    type: Number,
    required: true
  },
  quantity: { 
    type: Number,
    required: true
  },
  colors: { 
    type: Array ,
    required: true
  },

});

productSchema.pre("find", function (next) {
  this.populate(["categories"]);
  next();
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;
