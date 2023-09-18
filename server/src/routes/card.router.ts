import { Router } from "express";
import { cardController } from "../controllers/card.controller";
import authenticateUser from "../middleware/authenticateUser";

const cardRouter: Router = Router()

cardRouter.use(authenticateUser)
cardRouter.post('/', cardController.createCard)

export default cardRouter