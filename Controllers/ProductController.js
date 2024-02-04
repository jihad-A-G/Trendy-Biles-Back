import mongooose  from "mongoose";
import Product  from "../Models/ProductModel.js";
import Category from "../Models/CategoryModel.js";
import upload from "../config/multer.js";
import multer from "multer";

class ProductController {
    static createProduct = async (req, res) => {
      // Use multer middleware to handle file upload
      upload.single('image')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'Multer error' });
        } 
        else if (err) {
          return res.status(400).json({ error: err.message });
        }
    
        const { productName, price, cost, categories, description, deal, dealPrice, quantity, colors } = req.body;
        const image = req.file ? req.file.filename : undefined;
    
        try {
          // Find existing categories or create new ones
          const existingCategories = await Category.find({ _id: { $in: categories } });
           
          const product = await Product.create({
            productName,
            price,
            cost,
            categories: existingCategories,
            image,
            description,
            deal,
            dealPrice,
            quantity,
            colors
          });

          for (const category of existingCategories) {
            await Category.findByIdAndUpdate(
              category._id,
              { $addToSet: { products: product._id } },
              { new: true }
            );
          }
           res.status(200).json(product);
          }
          catch (error) {
            res.status(400).json({ error: error.message });
          }
        });
      };
    
    static readProduct = async (req, res) => {
        try {
          const product = await Product.getAllProducts();
          res.status(200).json(product);
        } catch (error) {
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
      upload.single('image')(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(400).json({ error: 'Multer error' });
        } 
        else if (err) {
            return res.status(400).json({ error: err.message });
        }
    
        const { id } = req.params;
        const { productName, price, cost, categories, description, deal, dealPrice, quantity, colors } = req.body;
        const image = req.file ? req.file.filename : undefined;
    
        try {
        // Find existing categories or create new ones
          const existingCategories = await Category.find({ _id: { $in: categories } });
            
          const updateFields = {
            productName,
            price,
            cost,
            categories: existingCategories,
            description,
            deal,
            dealPrice,
            quantity,
            colors
          };
    
          // Update the 'image' field only if a new file is uploaded
          if (image) {
            updateFields.image = image;
          }
    
          const product = await Product.findByIdAndUpdate(id, updateFields, { new: true });
    
          if (!product) {
            return res.status(404).json({ error: 'Product not found' });
          }

          await Category.updateMany(
            { _id: { $in: categories } },
            { $addToSet: { products: id } }
          );

          res.status(200).json(product);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
      });
    };

    static deleteProduct = async (req, res) => {
      const { id } = req.params;
      try {
        const product = await Product.findById(id);
    
        // Remove product from categories
        await Category.updateMany(
          { _id: { $in: product.categories } },
          { $pull: { products: id } }
        );
    
        await Product.findByIdAndDelete(id);
          res.status(200).json({ message: "Product deleted successfully" });
      } 
      catch (error) {
          res.status(400).json({ error: error.message });
      }
    };
}

export default ProductController

