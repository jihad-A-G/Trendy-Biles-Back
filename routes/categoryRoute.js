import express from "express";
import CategoryController from "../Controllers/CategoryController.js";
const categoryRouter = express.Router();

categoryRouter.post("/",CategoryController.createCategory);
categoryRouter.get("/",CategoryController.readCategory);
categoryRouter.get("/:id",CategoryController.readOneCategory);
categoryRouter.patch("/:id",CategoryController.updateCategory);
categoryRouter.delete("/:id",CategoryController.deleteCategory);

module.exports = categoryRouter;
