import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true,
  },
  confirm: { 
    type: Boolean,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

categorySchema.statics.getAllCategories = async () => {
  return this.find().populate("products");
};
categorySchema.statics.getOneCategory = async (categoryId) => {
  return this.findById(categoryId).populate("products");
};
  
const Category = mongoose.model("categories", categorySchema); // the products here is the name for table at data base

module.exports = Category;
