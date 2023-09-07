import { Router } from "express";
import { userController } from "../controllers/user.controller";


export const userRouter: Router = Router();

userRouter.post("/login",userController.login);
userRouter.post("/signup", userController.createUser);
userRouter.get("/me")

export default userRouter;
