import mongooose  from "mongoose";
import  Category  from "../Models/CategoryModel.js";

class CategoryController {
    static createCategory = async (req, res) => {
        const { name, confirm }  = req.body;

        try {
            const category = await Category.create({
                name,
                confirm
            });
            res.status(200).json(category);
        } 
        catch (error) {
            res.status(400).json({ ...error });
        }
    };
    
    static readCategory = async (req, res) => {
        try {
            const category = await Category.getAllCategories();
            res.status(200).json(category);
        } 
        catch (error) {
            res.status(400).json({ error: { ...error } });
        }
    };

    static readOneCategory = async (req, res) => {
        const { id } = req.params;
        try {
            const category = await Category.getOneCategory(id)
            res.status(200).json(category);
        } 
        catch (error) {
            res.status(400).json({ error: { ...error } });
        }
    };

    static updateCategory = async (req, res) => {
        const { id } = req.params;
        const { name, confirm } = req.body;

        try {
            const updateFields = {
                name,
                confirm
            };

            // Check if an image file is uploaded
            if (req.file) {
                updateFields.image = `${req.protocol}://${req.get("host")}/${req.file.path}`;
            };

            const category = await Category.findByIdAndUpdate(
                id,
                updateFields,
                { new: true }
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
            await Category.findByIdAndDelete(id);
            res.status(200).json({ message: "category deleted succefully" });
        } 
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = CategoryController

