import express from "express";
import AdminController from "../Controllers/AdminController.js";
const adminRouter = express.Router();

adminRouter.post("/",AdminController.createAdmin);
adminRouter.get("/",AdminController.readAdmin);
adminRouter.get("/:id",AdminController.readOneAdmin);
adminRouter.patch("/:id",AdminController.updateAdmin);
adminRouter.delete("/:id",AdminController.deleteAdmin);

export default adminRouter;