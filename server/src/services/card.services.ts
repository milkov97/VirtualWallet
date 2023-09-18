import { CardInterface } from "../models/card/interfaces/CardInterface"
import { ObjectId } from "mongodb"
import { connectToDatabase } from "../database/dbConnection"


class CardService {
    public async addCard(walletId: string) {
        const db = await connectToDatabase();
    }
}

export const cardService = new CardService()