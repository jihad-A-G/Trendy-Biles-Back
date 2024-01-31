import express from "express";
import {RoleController} from "../Controllers/RoleController.js";
import { authenticate,AdminRole} from "../middleware/auth.js";

const roleRouter = express.Router();

roleRouter.post("/",RoleController.createRole);
roleRouter.get("/",authenticate,AdminRole(['Super-Admin', 'Admin']),RoleController.readRole);
roleRouter.get("/:id",RoleController.readOneRole);
roleRouter.patch("/:id",RoleController.updateRole);
roleRouter.delete("/:id",RoleController.deleteRole);

export default roleRouter;