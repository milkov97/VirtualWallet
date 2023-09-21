import { Router } from "express";
import authenticateUser from "../middleware/authenticateUser";
import { requireToken } from "../middleware/requireToken";
import { transactionController } from "./../controllers/transaction.controller";


export const transactionRouter: Router = Router();

transactionRouter.use(authenticateUser)
transactionRouter.get("/", requireToken, )