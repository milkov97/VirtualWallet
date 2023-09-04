import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { token } from "../utils/auth/jwtToken";

export const userRouter: Router = Router();

userRouter.post("/login", token.createToken, userController.login);
userRouter.post("/signup", userController.createUser);

export default userRouter;
