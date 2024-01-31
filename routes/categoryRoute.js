import express from "express";
import CategoryController from "../Controllers/CategoryController.js";
import upload from "../config/multer.js";
const categoryRouter = express.Router();

categoryRouter.post("/",upload.single('categoryImage'),CategoryController.createCategory);
categoryRouter.get("/",CategoryController.readCategory);
categoryRouter.get("/:id",CategoryController.readOneCategory);
categoryRouter.patch("/:id",upload.single('categoryImage'),CategoryController.updateCategory);
categoryRouter.delete("/:id",CategoryController.deleteCategory);

export default  categoryRouter;
