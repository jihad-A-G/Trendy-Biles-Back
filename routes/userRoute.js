import express from "express";
import UserController from "../Controllers/UsersController.js";
const userRouter = express.Router();

userRouter.post("/users",UserController.createUser);
userRouter.get("/users",UserController.readUser);
userRouter.get("/users/:id",UserController.readOneUser);
userRouter.patch("/users/:id",UserController.updateUser);
userRouter.delete("/users/:id",UserController.deleteUser);

export default userRouter;