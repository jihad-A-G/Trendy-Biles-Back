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
});


const Category = mongoose.model("categories", categorySchema); // the products here is the name for table at data base

module.exports = Category;
