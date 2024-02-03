import mongoose from "mongoose";
import Product from "../Models/ProductModel.js";
import Category from "../Models/CategoryModel.js";
import ProductDetails from "../Models/ProductDetailsModel.js";
import Brand from "../Models/BrandModel.js";

class ProductController {
  // Create a new product
  static createProduct = async (req, res) => {
    const { productName, details, categories, brand, description, status } =
      req.body;

    try {
      // Find existing details
      const existingDetails = await ProductDetails.find({
        _id: { $in: details },
      });

      // Find existing categories or create new ones
      const existingCategories = await Category.find({
        _id: { $in: categories },
      });
      const existingBrand = await Brand.findById(brand); // Find existing brand

      const product = await Product.create({
        productName,
        details: existingDetails,
        categories: existingCategories,
        brand: existingBrand,
        description,
        status,
      });

      // Add product to the products array in each category
      for (const category of existingCategories) {
        await Category.findByIdAndUpdate(
          category._id,
          { $addToSet: { products: product._id } },
          { new: true }
        );
      }

      // Add product to the products array in the brand
      if (existingBrand) {
        await Brand.findByIdAndUpdate(
          brand,
          { $addToSet: { products: product._id } },
          { new: true }
        );
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  static readProduct = async (req, res) => {
    const { category } = req.query;
    try {
        let products;
        if (category) {
          // If a category is provided, find all products that belong to this category
          const categoryObj = await Category.findOne({ name: category }).populate({
            path: 'products',
            populate: [
              {
                path: 'details',
                model: 'productDetails'
              },
              {
                path: 'brand',
                model: 'brands'
              }
            ]
          });
          if (!categoryObj) {
            return res.status(404).json({ error: "Category not found" });
          }
          console.log('hi',categoryObj);
          products = categoryObj.products;
        } else {
          // If no category is provided, fetch all products
          products = await Product.find().populate('categories').populate('brand').populate('details');
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ error: { ...error } });
    }
   };
   
  // Get a single product by ID
  static readOneProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.getProductById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: { ...error } });
    }
  };

  // Update a product
  static updateProduct = async (req, res) => {
    const { id } = req.params;
    const { productName, details, categories, brand, description, status } =
      req.body;

    try {
      // Find existing details
      const existingDetails = await ProductDetails.find({
        _id: { $in: details },
      });

      // Find existing categories or create new ones
      const existingCategories = await Category.find({
        _id: { $in: categories },
      });
      const existingBrand = await Brand.findById(brand); // Find existing brand

      const updateFields = {
        productName,
        details: existingDetails,
        categories: existingCategories,
        brand: existingBrand,
        description,
        status,
      };

      const product = await Product.findByIdAndUpdate(id, updateFields, {
        new: true,
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Add product to the products array in each category
      await Category.updateMany(
        { _id: { $in: categories } },
        { $addToSet: { products: id } }
      );

      // Add product to the products array in the brand
      if (existingBrand) {
        await Brand.findByIdAndUpdate(
          brand,
          { $addToSet: { products: id } },
          { new: true }
        );
      }

      res.status(200).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Delete a product
  static deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);

      // Remove product from the products array in each category
      await Category.updateMany(
        { _id: { $in: product.categories } },
        { $pull: { products: id } }
      );

      // Remove product from the products array in the brand
      if (product.brand) {
        await Brand.findByIdAndUpdate(
          product.brand,
          { $pull: { products: id } },
          { new: true }
        );
      }

      // Remove product from the products array in each detail
      for (const detail of product.details) {
        await ProductDetails.findByIdAndUpdate(
          detail,
          { $pull: { products: id } },
          { new: true }
        );
      }

      await Product.findByIdAndDelete(id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default ProductController;
