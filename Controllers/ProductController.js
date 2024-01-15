import mongooose  from "mongoose";
import  Product  from "../Models/ProductModel.js";

class ProductController {
    static createProduct = async (req, res) => {
        const { productName, price, cost, categories, image, description, deal, dealPrice, quantity, colors} = req.body;
        try {
            const product = await Product.create({
                productName,
                price,
                cost,
                categories,
                image,
                description,
                deal,
                dealPrice,
                quantity,
                colors
            });
            res.status(200).json(product);
        } 

        catch (error) {
            res.status(400).json({ ...error });
        }
    };
    
    static readProduct = async (req, res) => {
        try {
            const product = await Product.getAllProducts();
            res.status(200).json(product);
        } 
        catch (error) {
            res.status(400).json({ error: { ...error } });
        }
    };

    static readOneProduct = async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.getProductById(id)
            res.status(200).json(product);
        } 
        catch (error) {
            res.status(400).json({ error: { ...error } });
        }
    };

    static updateProduct = async (req, res) => {
        const { id } = req.params;
        const { productName, price, cost, categories, description, deal, dealPrice, quantity, colors} = req.body;

        try {
            const updateFields = {
                productName,
                price,
                cost,
                categories,
                description,
                deal,
                dealPrice,
                quantity,
                colors
            };

          
            res.status(200).json(product);
        } 
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    };

    static deleteProduct = async (req, res) => {
        const { id } = req.params;
        try {
            await Product.findByIdAndDelete(id);
            res.status(200).json({ message: "Product deleted succefully" });
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    };
}

module.exports = ProductController

