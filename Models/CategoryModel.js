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
      ref: "products",
      required: false,
    },
  ],
});


categorySchema.statics.getAllCategories =  async function() 
{
  return this.find().populate("products");
};
categorySchema.statics.getOneCategory =  async function (categoryId) {
  return this.findById(categoryId)?.populate("products");
};
  
const Category = mongoose.model("categories", categorySchema); 

export default Category;
