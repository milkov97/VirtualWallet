import { Router } from "express";
import authenticateUser from "../middleware/authenticateUser";
import { walletController } from "../controllers/wallet.controller";
import { requireToken } from "../middleware/requireToken";

export const walletRouter: Router = Router()


walletRouter.use(authenticateUser)
walletRouter.get("/wallet", requireToken, walletController.getWallet)
walletRouter.post("/wallet/card", requireToken, walletController.addCard);

export default walletRouter
