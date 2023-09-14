import { Router } from "express";
import { userController } from "../controllers/user.controller";
import authenticateUser from "../middleware/authenticateUser"
import { requireUser } from "../middleware/requireUser";

export const userRouter: Router = Router();

userRouter.post("/login",userController.login);
userRouter.post("/signup", userController.createUser);
userRouter.get("/me", authenticateUser, userController.getUserInfo)
userRouter.put("/:id", userController.updateUserInfo)
userRouter.delete("/logout", requireUser, userController.logOut)

export default userRouter;
