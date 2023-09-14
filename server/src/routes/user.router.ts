import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { requireToken } from "../middleware/requireToken";

export const userRouter: Router = Router();

userRouter.post("/login",userController.login);
userRouter.post("/signup", userController.createUser);
userRouter.get("/me", requireToken, userController.getUserInfo);
userRouter.put("/:id", requireToken, userController.updateUserInfo)
userRouter.delete("/logout", requireToken, userController.logOut)

export default userRouter;
