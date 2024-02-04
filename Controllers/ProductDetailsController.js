import ProductDetails from "../Models/ProductDetailsModel.js";
import upload from "../config/multer.js";
import multer from "multer";

class ProductDetailsController {
  static createProductDetails = async (req, res) => {
    upload.array('images')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Multer error' });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }

      const {
        specificName,
        price,
        cost,
        deal,
        dealPrice,
        quantity,
        storage,
        ram,
        sim,
        color,
      } = req.body;

      const images = req.files ? req.files.map(file => file.filename) : [];

      try {
        const productDetail = await ProductDetails.create({
          specificName,
          price,
          cost,
          deal,
          dealPrice,
          quantity,
          images,
          storage,
          ram,
          sim,
          color,
        });

        res.status(200).json(productDetail);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
  };

  static readProductDetails = async (req, res) => {
    try {
      const productDetails = await ProductDetails.find();
      res.status(200).json(productDetails);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static readOneProductDetail = async (req, res) => {
    const { id } = req.params;
    try {
      const productDetail = await ProductDetails.findById(id);
      res.status(200).json(productDetail);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  static updateProductDetails = async (req, res) => {
    const { id } = req.params;
    upload.array('images')(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: 'Multer error' });
      } else if (err) {
        return res.status(400).json({ error: err.message });
      }

      const {
        specificName,
        price,
        cost,
        deal,
        dealPrice,
        quantity,
        storage,
        ram,
        sim,
        color,
      } = req.body;

      const images = req.files ? req.files.map(file => file.filename) : [];

      try {
        const updateFields = {
          specificName,
          price,
          cost,
          deal,
          dealPrice,
          quantity,
          images,
          storage,
          ram,
          sim,
          color,
        };

        const productDetail = await ProductDetails.findByIdAndUpdate(
          id,
          updateFields,
          { new: true }
        );

        if (!productDetail) {
          return res.status(404).json({ error: 'Product detail not found' });
        }

        res.status(200).json(productDetail);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    });
  };

  static deleteProductDetails = async (req, res) => {
    const { id } = req.params;
    try {
      await ProductDetails.findByIdAndDelete(id);
      res.status(200).json({ message: "Product detail deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default ProductDetailsController;
