import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { token } from "../utils/auth/jwtToken";

export const userRouter: Router = Router();


userRouter.post("/signup", userController.createUser);

userRouter.post("/login", token.createToken, userController.login);


export default userRouter;
