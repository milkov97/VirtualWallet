import { Router } from "express";
import authenticateUser from "../middleware/authenticateUser";
import { walletController } from "../controllers/wallet.controller";

export const walletRouter: Router = Router()


walletRouter.use(authenticateUser)
walletRouter.get("/wallet", walletController.getWallet)

export default walletRouter
