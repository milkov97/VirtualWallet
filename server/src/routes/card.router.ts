import { Router } from "express";
import { cardController } from "../controllers/card.controller";
import authenticateUser from "../middleware/authenticateUser";
import { requireToken } from "../middleware/requireToken";

const cardRouter: Router = Router()

cardRouter.use(authenticateUser)
cardRouter.post('/', requireToken,  cardController.createCard)

export default cardRouter