import { ObjectId } from "mongodb";
import { CardInterface } from "../models/card/interfaces/CardInterface";


class TransactionService{
  public async transferToWallet (ownerId: ObjectId, card: CardInterface) {
    
  }

}

export const transactionService = new TransactionService()