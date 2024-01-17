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
  categories: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "categories",
    required: true
  }],
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
  colors: [{ 
    name: { 
      type: String,
      required: true 
    },
    // quantity: {
    //   type: Number,
    //   required: true 
    // },
  }],

});

productSchema.statics.getAllProducts = async function() {
  return this.find().populate("categories");
};
productSchema.statics.getProductById = async function(productId) {
  return this.findById(productId).populate("categories");
};

const Product = mongoose.model("products", productSchema);

export default  Product;
