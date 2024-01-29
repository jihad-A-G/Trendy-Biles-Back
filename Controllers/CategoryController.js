import mongooose  from "mongoose";
import  Category  from "../Models/CategoryModel.js";
import Product from "../Models/ProductModel.js";

class CategoryController {
    static createCategory = async (req, res) => {
        const { name, confirm }  = req.body;
        const categoryImage = req.file
        console.log(categoryImage.path);
        if(!categoryImage){
            return res.status(400).json({status:400,message:'Image is required'})
        }

        try {
            const category = await Category.create({
                name,
                confirm,
                categoryImage:categoryImage?.path
            });
            res.status(200).json(category);
        } 
        catch (error) {
            res.status(400).json({ ...error });
        }
    };
    
    static readCategory = async (req, res) => {
        try {
            const category = await Category.find();
            res.status(200).json(category);
        } 
        catch (error) {
            console.log(error);
            res.status(400).json({ error: { ...error } });
        }
    };

    static readOneCategory = async (req, res) => {
        const { id } = req.params;
        try {
            const category = await Category.findById(id)
            res.status(200).json(category);
        } 
        catch (error) {
            res.status(400).json({ error: { ...error } });
        }
    };

    static updateCategory = async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;
        const categoryImage = req.file
        console.log(categoryImage?.path);

        try {
          

            const category = await Category.findByIdAndUpdate(
                id,{name:name,
                    categoryImage:categoryImage?.path}
                );

            res.status(200).json(category);
        } 
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    static deleteCategory = async (req, res) => {
        const { id } = req.params;
        try {
          const category = await Category.findById(id);
    
          // Remove category from products
          await Product.updateMany(
            { _id: { $in: category.products } },
            { $pull: { categories: id } }
          );
    
          await Category.findByIdAndDelete(id);
          res.status(200).json({ message: "Category deleted successfully" });
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      };
}

export default  CategoryController

