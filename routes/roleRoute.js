import express from "express";
import {RoleController} from "../Controllers/roleController.js";
const roleRouter = express.Router();

roleRouter.post("/",RoleController.createRole);
roleRouter.get("/",RoleController.readRole);
roleRouter.get("/:id",RoleController.readOneRole);
roleRouter.patch("/:id",RoleController.updateRole);
roleRouter.delete("/:id",RoleController.deleteRole);

export { roleRouter as RoleRoute };
