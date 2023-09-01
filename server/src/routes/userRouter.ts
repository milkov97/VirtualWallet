import { Router } from "express";
import { userController } from "../controllers/user.controller";

export const userRouter: Router = Router();

userRouter.get("/me", userController.getUser);

userRouter.post("/signup", userController.createUser);

userRouter.post("/login");


export default userRouter;
