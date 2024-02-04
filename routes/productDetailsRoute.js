// productDetails Route (productDetails.route.js)
import express from "express";
import ProductDetailsController from "../Controllers/ProductDetailsController.js";
import { authenticate } from "../middleware/auth.js";

const productDetailsRouter = express.Router();

productDetailsRouter.post("/", ProductDetailsController.createProductDetails);
productDetailsRouter.get("/", ProductDetailsController.readProductDetails);
productDetailsRouter.get("/:id", ProductDetailsController.readOneProductDetail);
productDetailsRouter.patch("/:id", ProductDetailsController.updateProductDetails);
productDetailsRouter.delete("/:id", ProductDetailsController.deleteProductDetails);

export default productDetailsRouter;
