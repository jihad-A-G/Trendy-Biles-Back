import express from "express";
import AdminController from "../Controllers/AdminController.js";
const adminRouter = express.Router();

adminRouter.post("/admins",AdminController.createAdmin);
adminRouter.get("/admins",AdminController.readAdmin);
adminRouter.get("/admins/:id",AdminController.readOneAdmin);
adminRouter.patch("/admins/:id",AdminController.updateAdmin);
adminRouter.delete("/admins/:id",AdminController.deleteAdmin);

export default adminRouter;