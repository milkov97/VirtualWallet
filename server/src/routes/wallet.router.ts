import { Router } from "express";
import authenticateUser from "../middleware/authenticateUser";
import { walletController } from "../controllers/wallet.controller";

export const walletRouter: Router = Router()


walletRouter.use(authenticateUser)
walletRouter.get("/wallet", walletController.getWallet)
walletRouter.post("/wallet/card", walletController.addCard)

export default walletRouter
