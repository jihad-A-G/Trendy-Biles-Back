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


const Category = mongoose.model("categories", categorySchema); // the categories here is the name for table at database

module.exports = Category;
