import express from "express";
import BrandController from "../Controllers/BrandController.js";
import { authenticate } from "../middleware/auth.js";

const brandRouter = express.Router();

brandRouter.post("/", BrandController.createBrand);
brandRouter.get("/", BrandController.readBrand);
brandRouter.get("/:id", BrandController.readOneBrand);
brandRouter.patch("/:id", BrandController.updateBrand);
brandRouter.delete("/:id", BrandController.deleteBrand);

export default brandRouter;