// BrandController.js
import mongoose from "mongoose";
import Brand from "../Models/BrandModel.js";
import Product from "../Models/ProductModel.js";

class BrandController {
  // Create a new brand
  static createBrand = async (req, res) => {
    const { name } = req.body;

    try {
      const brand = await Brand.create({
        name,
      });

      res.status(200).json(brand);
    } catch (error) {
      res.status(400).json({ ...error });
    }
  };

  // Get all brands
  static readBrand = async (req, res) => {
    try {
      const brands = await Brand.find();
      res.status(200).json(brands);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: { ...error } });
    }
  };

  // Get one brand by ID
  static readOneBrand = async (req, res) => {
    const { id } = req.params;
    try {
      const brand = await Brand.findById(id);
      res.status(200).json(brand);
    } catch (error) {
      res.status(400).json({ error: { ...error } });
    }
  };

  // Update a brand by ID
  static updateBrand = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const updateFields = {
        name,
      };

      const brand = await Brand.findByIdAndUpdate(
        id,
        updateFields,
        { new: true }
      );

      // Update products with the new brand name
      await Product.updateMany({ brand: id }, { brand: brand._id });

      res.status(200).json(brand);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  // Delete a brand by ID
  static deleteBrand = async (req, res) => {
    const { id } = req.params;
    try {
      const brand = await Brand.findById(id);

      // Update products to remove the brand reference
      await Product.updateMany({ brand: id }, { $unset: { brand: 1 } });

      await Brand.findByIdAndDelete(id);

      res.status(200).json({ message: "Brand deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default BrandController;
