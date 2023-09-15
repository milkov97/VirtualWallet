import { Router } from "express";
import { userController } from "../controllers/user.controller";
import { requireToken } from "../middleware/requireToken";
// import authenticateUser from "../middleware/authenticateUser";

export const userRouter: Router = Router();

userRouter.post("/login",userController.login);
userRouter.post("/signup", userController.createUser);
// userRouter.use(authenticateUser)
userRouter.get("/me",  userController.getUserInfo);
userRouter.put("/:id",  userController.updateUserInfo)
userRouter.delete("/logout", requireToken, userController.logOut)

export default userRouter;
